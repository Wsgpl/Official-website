import "../env";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { blogPosts } from "./schema";

const INITIAL_BLOG_POSTS = [
  {
    slug: "who-we-are-the-story-behind-wingspann-global",
    title: "Who We Are: The Story Behind Wingspann Global",
    excerpt:
      "Every startup begins with a small team that believes it can build something the country needs. Read our journey from a modest facility in Chhatrapati Sambhajinagar(Aurangabad) to a leading aerospace company.",
    body: `Every startup begins with a small team that believes it can build something the country needs. Ours began in September 2025, in a modest facility in Chhatrapati Sambhajinagar(Aurangabad).

From day one, the mission was clear: build reliable, high-performance unmanned aerial systems designed, engineered, and manufactured right here in India. We saw a gap in the market — existing solutions were either expensive imports or off-the-shelf components assembled without true aerospace-grade standards.

We set out to change that. Working through late nights and endless iterations, our team of passionate engineers designed our first prototype chassis from scratch. We focused heavily on structural integrity, power efficiency, and modular payload integration.

Today, Wingspann Global has grown into a full-fledged aerospace and advanced manufacturing company. Our drones perform critical missions in agriculture, industrial inspection, defense surveillance, and topographical mapping across the country.

As we look to the future, our core promise remains unchanged: relentless innovation, uncompromising quality, and an unwavering commitment to advancing Indian aerospace technology.`,
    coverImagePath: "/src/assets/Blog.jpg",
    publishedAt: new Date("2025-09-15T10:00:00Z"),
  },
  {
    slug: "our-first-flight-the-milestone-that-started-it-all",
    title: "Our First Flight: The Milestone That Started It All",
    excerpt:
      "Every aerospace company marks its journey with a defining first flight. What began as a concept developed in Chhatrapati Sambhajinagar(Aurangabad) has now demonstrated its ability to perform in real-world conditions.",
    body: `Every aerospace company marks its journey with a defining first flight. For us, this milestone represents the successful transition of an idea engineered in Chhatrapati Sambhajinagar(Aurangabad) into a fully functional, high-performance aerial platform.

The flight test evaluated basic flight dynamics, hovering stability, response latency, and fail-safe safety mechanisms under real-world ambient conditions. The custom carbon-composite airframe and propulsion system exceeded design parameters, maintaining exceptional stability even during gusty winds.

This maiden flight verified months of CAD modeling, FEA structural stress simulation, and flight control firmware tuning. It gave our engineering team the empirical dataset required to push forward into autonomous waypoint navigation and mission-specific payload integrations.

That first takeoff wasn't just a flight test — it was proof of our capability to build world-class UAV hardware end-to-end.`,
    coverImagePath: "/src/assets/serving mapping.webp",
    publishedAt: new Date("2025-10-10T10:00:00Z"),
  },
  {
    slug: "how-additive-manufacturing-is-reducing-aerospace-production-costs",
    title: "How Additive Manufacturing is Reducing Aerospace Production Costs",
    excerpt:
      "A deep dive into the materials and techniques driving cost efficiency in our latest drone chassis designs.",
    body: `Industrial 3D printing and additive manufacturing have revolutionized aerospace rapid prototyping and low-volume production.

By using high-strength carbon-reinforced polymers and SLA resin printing, Wingspann Global creates lightweight, highly optimized internal structural components without requiring expensive custom tooling or long lead-time CNC machining.

Topological optimization algorithms allow our engineers to place material only where stress concentration vectors demand it, reducing airframe mass by up to 28% while improving overall rigidity and crash tolerance.`,
    coverImagePath: "/src/assets/printing-hero.jpg",
    publishedAt: new Date("2026-06-28T10:00:00Z"),
  },
  {
    slug: "wingspann-unveils-next-gen-lidar-mapping-capabilities",
    title: "Wingspann Unveils Next-Gen LiDAR Mapping Capabilities",
    excerpt:
      "Our new sensor payload dramatically increases precision for topographical surveying and infrastructure inspection.",
    body: `Precision mapping demands sub-centimeter point cloud resolution under varying terrain and dense canopy conditions.

Wingspann Global's latest integrated LiDAR and RTK-GPS payload system allows surveying teams to capture up to 500,000 pulses per second, producing high-density 3D digital elevation models (DEMs) and digital terrain models (DTMs) in record time.

This technology is already active in major infrastructure projects, mining volume audits, and forest management surveys across Maharashtra.`,
    coverImagePath: "/src/assets/mapping.png",
    publishedAt: new Date("2026-06-15T10:00:00Z"),
  },
  {
    slug: "3d-printed-drone-parts-strength-vs-weight",
    title: "3D Printed Drone Parts: Strength vs Weight",
    excerpt:
      "How topology optimization and new polymers are changing the way we build drone frames.",
    body: `In UAV engineering, every gram of excess mass directly reduces flight endurance and payload capacity.

Our engineering department conducted rigorous tensile strength and impact resistance testing across PETG, ASA, Carbon-Fiber Nylon (PA-CF), and SLA Resins to identify optimal material selection for specific airframe load points.

Discover how our hybrid manufacturing approach combines carbon fiber spars with 3D-printed stress-bearing joints to maximize durability while keeping takeoff weight lean.`,
    coverImagePath: "/src/assets/3D1.webp",
    publishedAt: new Date("2026-04-10T10:00:00Z"),
  },
];

async function seedBlogPosts() {
  console.log("🌱 Seeding original 5 hardcoded blog posts into blog_posts table...");

  try {
    for (const post of INITIAL_BLOG_POSTS) {
      const existing = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, post.slug))
        .limit(1);

      if (existing.length > 0) {
        console.log(`ℹ️ Post '${post.slug}' already exists. Updating status to published...`);
        await db
          .update(blogPosts)
          .set({
            title: post.title,
            excerpt: post.excerpt,
            body: post.body,
            coverImagePath: post.coverImagePath,
            status: "published",
            publishedAt: post.publishedAt,
            updatedAt: new Date(),
          })
          .where(eq(blogPosts.slug, post.slug));
      } else {
        const id = crypto.randomUUID();
        await db.insert(blogPosts).values({
          id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          coverImagePath: post.coverImagePath,
          status: "published",
          publishedAt: post.publishedAt,
        });
        console.log(`✅ Seeded post: '${post.title}' (ID: ${id})`);
      }
    }

    console.log("🎉 All 5 blog posts successfully seeded with status: 'published'!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed blog posts:", err);
    process.exit(1);
  }
}

seedBlogPosts();
