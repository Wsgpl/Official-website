import dotenv from "dotenv";
dotenv.config();

import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "./index";
import { adminUsers } from "./schema";
import { hashPassword } from "../lib/auth.server";

async function seedAdmin() {
  console.log("🌱 Seeding initial administrator account...");

  const isProd = process.env.NODE_ENV === "production";
  const adminEmail = process.env.ADMIN_EMAIL || "admin@wingspannglobal.com";
  let adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    if (isProd) {
      console.error("❌ ERROR: ADMIN_PASSWORD environment variable must be set in production mode.");
      process.exit(1);
    }
    adminPassword = "AdminPassword123!";
  }

  try {
    const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, adminEmail)).limit(1);

    if (existing.length > 0) {
      console.log(`ℹ️ Admin user '${adminEmail}' already exists in database.`);
      process.exit(0);
    }

    const passwordHash = await hashPassword(adminPassword);
    const userId = crypto.randomUUID();

    await db.insert(adminUsers).values({
      id: userId,
      email: adminEmail,
      passwordHash,
      name: "System Administrator",
    });

    console.log(`✅ Admin account created successfully!`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    if (!isProd) {
      console.log(`⚠️ Change default password immediately after initial login.`);
    }
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed admin user:", err);
    process.exit(1);
  }
}

seedAdmin();
