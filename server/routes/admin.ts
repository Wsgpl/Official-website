import { Router, type Request, type Response } from "express";
import crypto from "node:crypto";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db";
import { adminUsers, submissions, uploads, blogPosts, products } from "../db/schema";
import {
  comparePassword,
  createAdminSession,
  destroyAdminSession,
  verifyAdminSession,
} from "../lib/auth.server";
import { adminLoginRateLimitMiddleware, verifyTurnstileToken } from "../lib/security.server";
import { logSecurityEvent } from "../lib/logger.server";

export const adminRouter = Router();

// Login Schema
const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  turnstileToken: z.string().min(1),
});

// Blog Post Schema
const blogSchema = z.object({
  slug: z.string().trim().min(2).max(160),
  title: z.string().trim().min(2).max(255),
  excerpt: z.string().trim().min(5),
  body: z.string().trim().min(10),
  coverImagePath: z.string().optional(),
  status: z.enum(["draft", "published"]).default("published"),
});

// Product Schema
const productSchema = z.object({
  slug: z.string().trim().min(2).max(160),
  name: z.string().trim().min(2).max(160),
  tagline: z.string().trim().min(2).max(255),
  flightTime: z.string().optional(),
  payload: z.string().optional(),
  range: z.string().optional(),
  applications: z.array(z.string()).optional(),
  imagePath: z.string().optional(),
  status: z.enum(["active", "archived"]).default("active"),
});

// ─── PUBLIC ADMIN ENDPOINTS ───

// POST /api/admin/login
adminRouter.post("/login", adminLoginRateLimitMiddleware, async (req: Request, res: Response): Promise<void> => {
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: "Invalid credentials or request data." });
    return;
  }

  const { email, password, turnstileToken } = parsed.data;

  // Turnstile verification
  const turnstileValid = await verifyTurnstileToken(turnstileToken, ip);
  if (!turnstileValid) {
    res.status(400).json({ success: false, error: "Security check failed (Turnstile)." });
    return;
  }

  try {
    const users = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    if (users.length === 0) {
      logSecurityEvent("AUTH_FAILED", ip, "/api/admin/login", { email });
      res.status(401).json({ success: false, error: "Invalid email or password." });
      return;
    }

    const user = users[0];
    const passwordMatch = await comparePassword(password, user.passwordHash);

    if (!passwordMatch) {
      logSecurityEvent("AUTH_FAILED", ip, "/api/admin/login", { email });
      res.status(401).json({ success: false, error: "Invalid email or password." });
      return;
    }

    const { cookieHeader } = await createAdminSession(user.id, ip);
    res.setHeader("Set-Cookie", cookieHeader);
    res.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error("Login processing error:", err);
    res.status(500).json({ success: false, error: "Internal server error during login." });
  }
});

// POST /api/admin/logout
adminRouter.post("/logout", async (req: Request, res: Response): Promise<void> => {
  const { cookieHeader } = await destroyAdminSession(req.headers.cookie);
  res.setHeader("Set-Cookie", cookieHeader);
  res.json({ success: true, message: "Logged out successfully." });
});

// ─── AUTHENTICATED ADMIN MIDDLEWARE ───
adminRouter.use(async (req: Request, res: Response, next): Promise<void> => {
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  const currentUser = await verifyAdminSession(req.headers.cookie, ip);

  if (!currentUser) {
    res.status(401).json({ success: false, error: "Unauthorized. Session invalid or expired." });
    return;
  }

  (req as any).user = currentUser;
  next();
});

// GET /api/admin/me
adminRouter.get("/me", (req: Request, res: Response): void => {
  const user = (req as any).user;
  res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
});

// GET /api/admin/submissions
adminRouter.get("/submissions", async (_req: Request, res: Response): Promise<void> => {
  try {
    const rows = await db
      .select({
        submission: submissions,
        upload: uploads,
      })
      .from(submissions)
      .leftJoin(uploads, eq(submissions.id, uploads.submissionId))
      .orderBy(desc(submissions.createdAt));

    res.json({ success: true, submissions: rows });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ success: false, error: "Failed to fetch submissions." });
  }
});

// PATCH /api/admin/submissions/:id
adminRouter.patch("/submissions/:id", async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const { status } = req.body;

  if (!["new", "read", "archived"].includes(status)) {
    res.status(400).json({ success: false, error: "Invalid status value." });
    return;
  }

  try {
    await db.update(submissions).set({ status }).where(eq(submissions.id, id));
    res.json({ success: true, message: "Submission updated." });
  } catch (err) {
    console.error("Error updating submission:", err);
    res.status(500).json({ success: false, error: "Failed to update submission." });
  }
});

// ─── BLOG POSTS CRUD ───
adminRouter.get("/blog", async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch blog posts." });
  }
});

adminRouter.post("/blog", async (req: Request, res: Response): Promise<void> => {
  const parsed = blogSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: "Invalid blog post data", details: parsed.error.format() });
    return;
  }

  try {
    const id = crypto.randomUUID();
    await db.insert(blogPosts).values({
      id,
      ...parsed.data,
      publishedAt: parsed.data.status === "published" ? new Date() : null,
    });
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to create blog post." });
  }
});

adminRouter.delete("/blog/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, req.params.id));
    res.json({ success: true, message: "Blog post deleted." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete blog post." });
  }
});

// ─── PRODUCTS CRUD ───
adminRouter.get("/products", async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await db.select().from(products).orderBy(desc(products.createdAt));
    res.json({ success: true, products: items });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch products." });
  }
});

adminRouter.post("/products", async (req: Request, res: Response): Promise<void> => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: "Invalid product data", details: parsed.error.format() });
    return;
  }

  try {
    const id = crypto.randomUUID();
    await db.insert(products).values({
      id,
      slug: parsed.data.slug,
      name: parsed.data.name,
      tagline: parsed.data.tagline,
      flightTime: parsed.data.flightTime || null,
      payload: parsed.data.payload || null,
      range: parsed.data.range || null,
      applications: parsed.data.applications ? JSON.stringify(parsed.data.applications) : null,
      imagePath: parsed.data.imagePath || null,
      status: parsed.data.status,
    });
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to create product." });
  }
});

adminRouter.delete("/products/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await db.delete(products).where(eq(products.id, req.params.id));
    res.json({ success: true, message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete product." });
  }
});
