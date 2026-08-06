import { Router, type Request, type Response } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import { blogPosts, products } from "../db/schema";

export const publicRouter = Router();

// GET /api/blog — Public published blog posts (No authentication required)
publicRouter.get("/blog", async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));

    res.json({ success: true, posts });
  } catch (err) {
    console.error("[Public API Error] Failed to fetch published blog posts:", err);
    res.status(500).json({ success: false, error: "Failed to fetch blog posts." });
  }
});

// GET /api/products — Public active products (No authentication required)
publicRouter.get("/products", async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await db
      .select()
      .from(products)
      .where(eq(products.status, "active"))
      .orderBy(desc(products.createdAt));

    const formattedProducts = items.map((item) => {
      let apps: string[] = [];
      if (item.applications) {
        try {
          apps = typeof item.applications === "string" ? JSON.parse(item.applications) : item.applications;
        } catch {
          apps = [];
        }
      }
      return {
        ...item,
        applications: apps,
      };
    });

    res.json({ success: true, products: formattedProducts });
  } catch (err) {
    console.error("[Public API Error] Failed to fetch active products:", err);
    res.status(500).json({ success: false, error: "Failed to fetch products." });
  }
});
