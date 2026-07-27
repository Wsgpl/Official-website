import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { eq, and, gt } from "drizzle-orm";
import { db } from "../db";
import { adminSessions, adminUsers, type AdminUser } from "../db/schema";
import { logSecurityEvent } from "./logger.server";

export const SESSION_COOKIE_NAME = "wingspan_admin_session";
const SESSION_DURATION_HOURS = 24;

// 1. Password Hashing & Verification (bcryptjs)
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// 2. Session Management
export async function createAdminSession(
  userId: string,
  ip: string
): Promise<{ token: string; expiresAt: Date; cookieHeader: string }> {
  const token = crypto.randomBytes(32).toString("hex");
  const id = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000);

  await db.insert(adminSessions).values({
    id,
    userId,
    token,
    expiresAt,
  });

  logSecurityEvent("AUTH_SUCCESS", ip, "/api/admin/login", { userId });

  const isProd = process.env.NODE_ENV === "production";
  const secureFlag = isProd ? "Secure; " : "";
  const cookieHeader = `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; ${secureFlag}Expires=${expiresAt.toUTCString()}`;

  return { token, expiresAt, cookieHeader };
}

export async function verifyAdminSession(
  cookieHeader: string | undefined,
  ip: string
): Promise<AdminUser | null> {
  if (!cookieHeader) return null;

  const cookies = parseCookies(cookieHeader);
  const token = cookies[SESSION_COOKIE_NAME];
  if (!token) return null;

  try {
    const now = new Date();
    const rows = await db
      .select({
        session: adminSessions,
        user: adminUsers,
      })
      .from(adminSessions)
      .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
      .where(and(eq(adminSessions.token, token), gt(adminSessions.expiresAt, now)))
      .limit(1);

    if (rows.length === 0) {
      logSecurityEvent("UNAUTHORIZED_ACCESS", ip, "verify_admin_session", { tokenProvided: true });
      return null;
    }

    return rows[0].user;
  } catch (err) {
    console.error("Session verification error:", err);
    return null;
  }
}

export async function destroyAdminSession(cookieHeader: string | undefined): Promise<{ cookieHeader: string }> {
  if (cookieHeader) {
    const cookies = parseCookies(cookieHeader);
    const token = cookies[SESSION_COOKIE_NAME];
    if (token) {
      try {
        await db.delete(adminSessions).where(eq(adminSessions.token, token));
      } catch (err) {
        console.error("Error deleting session:", err);
      }
    }
  }

  const isProd = process.env.NODE_ENV === "production";
  const secureFlag = isProd ? "Secure; " : "";
  const clearCookieHeader = `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; ${secureFlag}Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  return { cookieHeader: clearCookieHeader };
}

export function parseCookies(cookieHeader: string): Record<string, string> {
  const list: Record<string, string> = {};
  cookieHeader.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const val = parts.slice(1).join("=").trim();
      list[name] = decodeURIComponent(val);
    }
  });
  return list;
}
