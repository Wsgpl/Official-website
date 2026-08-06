import "../env";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { products } from "./schema";

const INITIAL_PRODUCTS = [
  {
    slug: "the-third-eye",
    name: "THE THIRD EYE",
    tagline: "Flagship industrial quadcopter",
    flightTime: "40 min",
    payload: "180 g",
    range: "4.1 km",
    applications: JSON.stringify(["Inspection", "Mapping", "Surveillance"]),
    imagePath: "/src/assets/3Rd eye.jpg",
  },
  {
    slug: "sentinel-s-survey",
    name: "Sentinel-S Survey",
    tagline: "Long-range survey & mapping",
    flightTime: "60 min",
    payload: "2.0 kg",
    range: "25 km",
    applications: JSON.stringify(["Topography", "Cadastral", "GIS"]),
    imagePath: "/src/assets/EX 950 Drone.webp",
  },
  {
    slug: "caddxfpv-gofilm-20",
    name: "CADDXFPV GoFilm 20",
    tagline: "True 4K starlight cinematic FPV",
    flightTime: "30 min",
    payload: "115 g",
    range: "Avatar HD",
    applications: JSON.stringify(["Cinematic", "Freestyle", "FPV Drone"]),
    imagePath: "/src/assets/1.png",
  },
];

async function seedProducts() {
  console.log("🌱 Seeding original 3 hardcoded products into products table...");

  try {
    for (const prod of INITIAL_PRODUCTS) {
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.slug, prod.slug))
        .limit(1);

      if (existing.length > 0) {
        console.log(`ℹ️ Product '${prod.slug}' already exists. Updating details & status to active...`);
        await db
          .update(products)
          .set({
            name: prod.name,
            tagline: prod.tagline,
            flightTime: prod.flightTime,
            payload: prod.payload,
            range: prod.range,
            applications: prod.applications,
            imagePath: prod.imagePath,
            status: "active",
            updatedAt: new Date(),
          })
          .where(eq(products.slug, prod.slug));
      } else {
        const id = crypto.randomUUID();
        await db.insert(products).values({
          id,
          slug: prod.slug,
          name: prod.name,
          tagline: prod.tagline,
          flightTime: prod.flightTime,
          payload: prod.payload,
          range: prod.range,
          applications: prod.applications,
          imagePath: prod.imagePath,
          status: "active",
        });
        console.log(`✅ Seeded product: '${prod.name}' (ID: ${id})`);
      }
    }

    console.log("🎉 All 3 products successfully seeded with status: 'active'!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed products:", err);
    process.exit(1);
  }
}

seedProducts();
