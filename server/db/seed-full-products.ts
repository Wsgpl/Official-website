import "../env";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { products } from "./schema";

const PUBLIC_UPLOADS_DIR = path.join(process.cwd(), process.env.PUBLIC_UPLOAD_DIR || "public_uploads");
const SRC_ASSETS_DIR = path.join(process.cwd(), "src", "assets");

async function copyAssetToPublicUploads(sourceFileName: string): string {
  try {
    if (!fsSync.existsSync(PUBLIC_UPLOADS_DIR)) {
      await fs.mkdir(PUBLIC_UPLOADS_DIR, { recursive: true });
    }
    const srcPath = path.join(SRC_ASSETS_DIR, sourceFileName);
    const sanitizedFileName = sourceFileName.replace(/\s+/g, "_");
    const destPath = path.join(PUBLIC_UPLOADS_DIR, sanitizedFileName);

    if (fsSync.existsSync(srcPath)) {
      await fs.copyFile(srcPath, destPath);
      console.log(`  📁 Copied asset: '${sourceFileName}' -> '/public-uploads/${sanitizedFileName}'`);
    } else {
      console.warn(`  ⚠️ Asset not found in src/assets: '${sourceFileName}' (leaving fallback path)`);
    }
    return `/public-uploads/${sanitizedFileName}`;
  } catch (err) {
    console.error(`  ❌ Error copying asset '${sourceFileName}':`, err);
    return `/src/assets/${sourceFileName}`;
  }
}

async function seedFullProducts() {
  console.log("🌱 Starting full products content migration & asset copying...");

  // 1. Third Eye Assets
  const thirdEyeImg = await copyAssetToPublicUploads("3Rd eye.jpg");
  const thirdEyeHeroVideo = await copyAssetToPublicUploads("original.mp4");
  const thirdEyeLogo = await copyAssetToPublicUploads("The third eye transparent.png");
  const thirdEyeBrochure = await copyAssetToPublicUploads("the-third-eye-brochure.pdf");
  const thirdEye3D1 = await copyAssetToPublicUploads("3D1.webp");
  const thirdEye3D2 = await copyAssetToPublicUploads("3D2.webp");
  const thirdEyeThermalVideo = await copyAssetToPublicUploads("thermal.mp4");
  const thirdEyeVisibleVideo = await copyAssetToPublicUploads("recard_visible_181853.mp4");
  const thirdEyeHeavyDutyImg = await copyAssetToPublicUploads("Heavy duty opreational.jpeg");
  const thirdEyePortableImg = await copyAssetToPublicUploads("Portable Design.jpeg");

  // 2. Sentinel Assets
  const sentinelImg = await copyAssetToPublicUploads("EX 950 Drone.webp");
  const sentinelServingImg = await copyAssetToPublicUploads("serving mapping.webp");
  const sentinelWarroomImg = await copyAssetToPublicUploads("Warrooms.jpg");

  // 3. Caddx FPV Assets
  const caddxImg = await copyAssetToPublicUploads("1.png");

  // ── THE THIRD EYE ──
  const thirdEyeData = {
    slug: "the-third-eye",
    name: "THE THIRD EYE",
    tagline: "Flagship quadcopter engineered for inspection, mapping, and persistence surveillance.",
    categoryEyebrow: "FLAGSHIP INDUSTRIAL QUADCOPTER",
    badge: "FLAGSHIP",
    themeColor: "purple",
    flightTime: "40 min",
    payload: "180 g",
    range: "4.1 km",
    applications: ["Inspection", "Mapping", "Surveillance"],
    imagePath: thirdEyeImg,
    status: "active",
    statHighlights: [
      { label: "FLIGHT TIME", value: "40 min" },
      { label: "PAYLOAD", value: "180 g" },
      { label: "RANGE", value: "4.1 km" },
    ],
    heroLogoUrl: thirdEyeLogo,
    heroDescription:
      "THE THIRD EYE is Wingspann Global's flagship quadcopter engineered for high-precision thermal inspection, topographical mapping, and persistence tactical surveillance. Built with high-strength composite materials and modular payload bays.",
    heroMediaUrl: thirdEyeHeroVideo,
    heroMediaType: "video",
    brochureUrl: thirdEyeBrochure,
    heroStats: [
      { label: "FLIGHT TIME", value: "40 min" },
      { label: "PAYLOAD", value: "180 g" },
      { label: "RANGE", value: "4.1 km" },
    ],
    featureGrids: [
      {
        eyebrow: "MISSION-TUNED ENGINEERING",
        title: "Built for Extremes",
        subtitle: "Every component is designed, FEA-analyzed, and field-tested for mission-critical operations.",
        cards: [
          {
            icon: "Shield",
            title: "IP54 Weather Rated",
            description: "Sealed carbon composite enclosure protects avionics against rain, dust, and coastal humidity.",
          },
          {
            icon: "Zap",
            title: "Dual-Battery Redundancy",
            description: "Hot-swappable dual smart batteries ensure safe return-to-home even if a cell fails.",
          },
          {
            icon: "Radio",
            title: "AES-256 Encrypted Datalink",
            description: "Secure long-range telemetry and live HD video feed resistant to signal jamming.",
          },
          {
            icon: "Cpu",
            title: "Onboard AI Edge Compute",
            description: "Integrated Neural Processing Unit enables real-time object detection and target tracking.",
          },
        ],
      },
      {
        eyebrow: "APPLICATION SCENARIOS",
        title: "Versatile Operational Deployments",
        subtitle: "Configurable for industrial assets, border security, disaster response, and agricultural monitoring.",
        cards: [
          {
            icon: "Eye",
            title: "Infrastructure Inspection",
            description: "High-resolution thermal and RGB sensors for solar farms, powerlines, and transmission towers.",
          },
          {
            icon: "Compass",
            title: "Topographical Survey",
            description: "RTK-GPS integrated camera payloads delivering sub-centimeter digital surface models.",
          },
          {
            icon: "ShieldAlert",
            title: "Perimeter Defense",
            description: "Automated waypoint patrols with automated thermal detection alerts for security teams.",
          },
        ],
      },
    ],
    specSheet: [
      {
        categoryName: "Platform & Airframe",
        rows: [
          { label: "Airframe Structure", value: "Carbon Fiber Composite + 3D Printed Joints" },
          { label: "Diagonal Wheelbase", value: "650 mm" },
          { label: "Maximum Takeoff Weight (MTOW)", value: "3.2 kg" },
          { label: "Ingress Protection Rating", value: "IP54 Dust & Splash Resistant" },
          { label: "Operating Temperature", value: "-10°C to 50°C" },
        ],
      },
      {
        categoryName: "Flight Performance",
        rows: [
          { label: "Maximum Flight Time", value: "40 Minutes (Standard Payload)" },
          { label: "Maximum Control Range", value: "4.1 km (Line of Sight)" },
          { label: "Maximum Wind Resistance", value: "12 m/s (Grade 6)" },
          { label: "Maximum Speed", value: "18 m/s (65 km/h)" },
          { label: "Hover Accuracy", value: "Vertical: ±0.1 m, Horizontal: ±0.1 m (RTK Enabled)" },
        ],
      },
      {
        categoryName: "Payload & Telemetry",
        rows: [
          { label: "Supported Gimbal Payloads", value: "Dual-Sensor Thermal/RGB, 4K Optical Zoom, LiDAR" },
          { label: "Max Payload Mass", value: "180 g - 500 g" },
          { label: "Telemetry Frequency", value: "2.4 GHz / 5.8 GHz Auto-Switching" },
          { label: "Encryption", value: "AES-256 Hardware Encrypted" },
        ],
      },
    ],
    mediaSections: [
      {
        title: "Rapid Dual-Battery Compartment",
        description: "Toolless quick-release mechanism allows battery swaps in under 15 seconds during critical field missions.",
        mediaUrls: [{ url: thirdEye3D1, type: "image" }],
        miniFeatures: [
          { title: "Smart BMS System", description: "Real-time cell balance monitoring and automatic pre-heating in cold climates." },
          { title: "Hot-Swap Capable", description: "Maintains avionics power during single-battery replacement." },
        ],
        sideInfoCard: {
          title: "Power Architecture",
          items: [
            { label: "Battery Capacity", value: "10,000 mAh 6S" },
            { label: "Energy Density", value: "245 Wh/kg" },
            { label: "Swap Duration", value: "< 15 Seconds" },
          ],
        },
      },
      {
        title: "Radiometric Thermal Imaging Payload",
        description: "FLIR radiometric thermal core captures exact temperature measurements across every pixel for solar and electrical inspections.",
        mediaUrls: [{ url: thirdEyeThermalVideo, type: "video" }],
        miniFeatures: [
          { title: "640x512 Resolution", description: "High-contrast thermal sensor detecting heat deltas as small as 0.05°C." },
          { title: "Isotherm Color Profiles", description: "Customizable heat palette triggers for automatic anomaly alerts." },
        ],
      },
      {
        title: "Visible Spectrum 4K Camera Payload",
        description: "Ultra-sharp optical camera with 20x hybrid zoom for crystal-clear visual validation from safe stand-off distances.",
        mediaUrls: [{ url: thirdEyeVisibleVideo, type: "video" }],
      },
      {
        title: "Heavy-Duty Operational Airframe",
        description: "Foldable rotor arms and quick-lock landing gear allow compact transport in hard cases.",
        mediaUrls: [
          { url: thirdEyeHeavyDutyImg, type: "image" },
          { url: thirdEyePortableImg, type: "image" },
        ],
      },
    ],
    statsBar: [
      { value: "40", unit: "min", label: "Max Endurance" },
      { value: "4.1", unit: "km", label: "Control Distance" },
      { value: "180", unit: "g", label: "Payload Capacity" },
      { value: "IP54", unit: "Rating", label: "Weather Shield" },
    ],
  };

  // ── SENTINEL-S SURVEY ──
  const sentinelData = {
    slug: "sentinel-s-survey",
    name: "Sentinel-S Survey",
    tagline: "Precision fixed-wing platform designed for high-resolution topographic and GIS mapping.",
    categoryEyebrow: "LONG-RANGE SURVEY & MAPPING",
    badge: "SURVEY",
    themeColor: "blue",
    flightTime: "60 min",
    payload: "2.0 kg",
    range: "25 km",
    applications: ["Topography", "Cadastral", "GIS"],
    imagePath: sentinelImg,
    status: "active",
    statHighlights: [
      { label: "FLIGHT TIME", value: "60 min" },
      { label: "PAYLOAD", value: "2.0 kg" },
      { label: "RANGE", value: "25 km" },
    ],
    heroLogoUrl: null,
    heroDescription:
      "Sentinel-S Survey is an endurance fixed-wing VTOL UAV designed for large-scale cadastral mapping, mining volume calculations, and corridor surveys across vast geographical areas.",
    heroMediaUrl: sentinelImg,
    heroMediaType: "image",
    brochureUrl: null,
    heroStats: [
      { label: "FLIGHT TIME", value: "60 min" },
      { label: "PAYLOAD", value: "2.0 kg" },
      { label: "RANGE", value: "25 km" },
    ],
    featureGrids: [
      {
        eyebrow: "MISSION-TUNED MAPPING ENGINEERING",
        title: "Survey Efficiency Redefined",
        subtitle: "Cover hundreds of hectares per single battery charge with centimeter-level georeferencing precision.",
        cards: [
          {
            icon: "Compass",
            title: "RTK / PPK Precision",
            description: "Multifrequency GNSS receiver eliminates the need for ground control points (GCPs).",
          },
          {
            icon: "Map",
            title: "Autonomous Coverage",
            description: "Pre-planned grid flight paths with automated overlap calculation and terrain following.",
          },
          {
            icon: "Wind",
            title: "VTOL Vertical Takeoff",
            description: "Takes off and lands vertically in confined spaces without requiring a runway or catapult.",
          },
        ],
      },
    ],
    specSheet: [
      {
        categoryName: "Platform & Wingspan",
        rows: [
          { label: "Architecture", value: "Fixed-Wing VTOL (Vertical Take-off & Landing)" },
          { label: "Wingspan", value: "2,100 mm" },
          { label: "Maximum Takeoff Weight", value: "7.5 kg" },
          { label: "Material Construction", value: "EPO Foam + Carbon Fiber Spars" },
        ],
      },
      {
        categoryName: "Performance & Range",
        rows: [
          { label: "Flight Time", value: "60 Minutes" },
          { label: "Survey Speed", value: "19 m/s (68 km/h)" },
          { label: "Max Operational Range", value: "25 km" },
          { label: "Single-Flight Coverage", value: "Up to 500 Hectares @ 3 cm GSD" },
        ],
      },
      {
        categoryName: "Survey Sensor Support",
        rows: [
          { label: "Full-Frame Camera Payload", value: "Sony RX1R II / A6400 Orthophoto Payload" },
          { label: "Multispectral Payload", value: "MicaSense RedEdge-P / Altum-PT Agriculture Sensor" },
          { label: "Positioning System", value: "PPK/RTK Dual-Frequency GNSS" },
        ],
      },
    ],
    mediaSections: [
      {
        title: "Large-Area Mapping Integration",
        description: "High-efficiency aerodynamics combined with precision photogrammetry camera payloads allow broad geographical coverage.",
        mediaUrls: [{ url: sentinelServingImg, type: "image" }],
      },
      {
        title: "Tactical Command & War Room Integration",
        description: "Live telemetry and mission status broadcast directly to centralized command centers.",
        mediaUrls: [{ url: sentinelWarroomImg, type: "image" }],
      },
    ],
    statsBar: [
      { value: "60", unit: "min", label: "Survey Endurance" },
      { value: "25", unit: "km", label: "Mapping Distance" },
      { value: "2.0", unit: "kg", label: "Payload Capacity" },
      { value: "500", unit: "Ha", label: "Coverage Per Flight" },
    ],
  };

  // ── CADDXFPV GOFILM 20 ──
  const caddxData = {
    slug: "caddxfpv-gofilm-20",
    name: "CADDXFPV GoFilm 20",
    tagline: "True 4K starlight cinematic FPV drone platform",
    categoryEyebrow: "CINEMATIC FPV",
    badge: "COMING SOON",
    themeColor: "cyan",
    flightTime: "30 min",
    payload: "115 g",
    range: "Avatar HD",
    applications: ["Cinematic", "Freestyle", "FPV Drone"],
    imagePath: caddxImg,
    status: "coming_soon",
    statHighlights: [
      { label: "FLIGHT TIME", value: "30 min" },
      { label: "PAYLOAD", value: "115 g" },
      { label: "VIDEO LINK", value: "Avatar HD" },
    ],
    heroLogoUrl: null,
    heroDescription:
      "Ultra-light 2-inch cinematic FPV drone equipped with the Avatar Moonlight Kit for true 4K starlight footage and gyroflow stabilization.",
    heroMediaUrl: caddxImg,
    heroMediaType: "image",
    brochureUrl: null,
    heroStats: [
      { label: "FLIGHT TIME", value: "30 min" },
      { label: "PAYLOAD", value: "115 g" },
      { label: "VIDEO LINK", value: "Avatar HD" },
    ],
    featureGrids: [],
    specSheet: [],
    mediaSections: [],
    statsBar: [
      { value: "30", unit: "min", label: "Flight Time" },
      { value: "115", unit: "g", label: "Takeoff Weight" },
      { value: "4K", unit: "Starlight", label: "Night Vision" },
      { value: "HD", unit: "Avatar", label: "Digital FPV" },
    ],
  };

  const productList = [thirdEyeData, sentinelData, caddxData];

  for (const prod of productList) {
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.slug, prod.slug))
      .limit(1);

    const valuesToSet = {
      slug: prod.slug,
      name: prod.name,
      tagline: prod.tagline,
      categoryEyebrow: prod.categoryEyebrow,
      badge: prod.badge,
      themeColor: prod.themeColor,
      flightTime: prod.flightTime,
      payload: prod.payload,
      range: prod.range,
      applications: JSON.stringify(prod.applications),
      imagePath: prod.imagePath,
      status: prod.status,
      statHighlights: JSON.stringify(prod.statHighlights),
      heroLogoUrl: prod.heroLogoUrl,
      heroDescription: prod.heroDescription,
      heroMediaUrl: prod.heroMediaUrl,
      heroMediaType: prod.heroMediaType,
      brochureUrl: prod.brochureUrl,
      heroStats: JSON.stringify(prod.heroStats),
      featureGrids: JSON.stringify(prod.featureGrids),
      specSheet: JSON.stringify(prod.specSheet),
      mediaSections: JSON.stringify(prod.mediaSections),
      statsBar: JSON.stringify(prod.statsBar),
      updatedAt: new Date(),
    };

    if (existing.length > 0) {
      console.log(`ℹ️ Product '${prod.slug}' exists. Updating with full migrated content & public_uploads assets...`);
      await db.update(products).set(valuesToSet).where(eq(products.slug, prod.slug));
    } else {
      const id = crypto.randomUUID();
      await db.insert(products).values({
        id,
        ...valuesToSet,
      });
      console.log(`✅ Seeded new product: '${prod.name}' (ID: ${id})`);
    }
  }

  console.log("🎉 Full content migration completed successfully!");
  process.exit(0);
}

seedFullProducts().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
