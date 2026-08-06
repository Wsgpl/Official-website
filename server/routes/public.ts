import { Router, type Request, type Response } from "express";
import { eq, desc, or } from "drizzle-orm";
import { db } from "../db";
import { blogPosts, products } from "../db/schema";

export const publicRouter = Router();

function parseIfNeeded(val: any): any {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
}

// GET /api/blog — Public published blog posts
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

// GET /api/products — Public active & coming_soon products for listing grid
publicRouter.get("/products", async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await db
      .select()
      .from(products)
      .where(or(eq(products.status, "active"), eq(products.status, "coming_soon")))
      .orderBy(desc(products.createdAt));

    const formattedProducts = items.map((item) => ({
      ...item,
      applications: parseIfNeeded(item.applications) || [],
      statHighlights: parseIfNeeded(item.statHighlights) || [],
      heroStats: parseIfNeeded(item.heroStats) || [],
      featureGrids: parseIfNeeded(item.featureGrids) || [],
      specSheet: parseIfNeeded(item.specSheet) || [],
      mediaSections: parseIfNeeded(item.mediaSections) || [],
      statsBar: parseIfNeeded(item.statsBar) || [],
    }));

    res.json({ success: true, products: formattedProducts });
  } catch (err) {
    console.error("[Public API Error] Failed to fetch active products:", err);
    res.status(500).json({ success: false, error: "Failed to fetch products." });
  }
});

// GET /api/products/:slug — Public single product detail by slug
publicRouter.get("/products/:slug", async (req: Request, res: Response): Promise<void> => {
  const slug = req.params.slug as string;
  try {
    const items = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (items.length === 0) {
      res.status(404).json({ success: false, error: "Product not found." });
      return;
    }

    const item = items[0];
    const product = {
      ...item,
      applications: parseIfNeeded(item.applications) || [],
      statHighlights: parseIfNeeded(item.statHighlights) || [],
      heroStats: parseIfNeeded(item.heroStats) || [],
      featureGrids: parseIfNeeded(item.featureGrids) || [],
      specSheet: parseIfNeeded(item.specSheet) || [],
      mediaSections: parseIfNeeded(item.mediaSections) || [],
      statsBar: parseIfNeeded(item.statsBar) || [],
    };

    res.json({ success: true, product });
  } catch (err) {
    console.error(`[Public API Error] Failed to fetch product details for slug '${slug}':`, err);
    res.status(500).json({ success: false, error: "Failed to fetch product details." });
  }
});
