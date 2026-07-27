import { mysqlTable, varchar, text, timestamp, boolean, bigint } from "drizzle-orm/mysql-core";

// 1. Submissions Table
export const submissions = mysqlTable("submissions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  source: varchar("source", { length: 32 }).notNull(), // quote | contact | consultation | careers | rpto | 3d_print
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  company: varchar("company", { length: 120 }),
  subject: varchar("subject", { length: 120 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("new").notNull(), // new | read | archived
  notified: boolean("notified").default(false).notNull(),
});

// 2. Uploads Table
export const uploads = mysqlTable("uploads", {
  id: varchar("id", { length: 36 }).primaryKey(),
  submissionId: varchar("submission_id", { length: 36 })
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  originalFilename: varchar("original_filename", { length: 255 }).notNull(),
  storedPath: varchar("stored_path", { length: 500 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Blog Posts Table
export const blogPosts = mysqlTable("blog_posts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  coverImagePath: varchar("cover_image_path", { length: 500 }),
  status: varchar("status", { length: 20 }).default("draft").notNull(), // draft | published
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 4. Products Table
export const products = mysqlTable("products", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  tagline: varchar("tagline", { length: 255 }).notNull(),
  flightTime: varchar("flight_time", { length: 50 }),
  payload: varchar("payload", { length: 50 }),
  range: varchar("range", { length: 50 }),
  applications: text("applications"), // JSON string array
  imagePath: varchar("image_path", { length: 500 }),
  status: varchar("status", { length: 20 }).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. Admin Users Table
export const adminUsers = mysqlTable("admin_users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;

// 6. Admin Sessions Table
export const adminSessions = mysqlTable("admin_sessions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => adminUsers.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
