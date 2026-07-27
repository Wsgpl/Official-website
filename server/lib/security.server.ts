import type { Request, Response, NextFunction } from "express";
import { logSecurityEvent } from "./logger.server";

// In-memory sliding window rate limit tracking
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const loginRateLimitMap = new Map<string, RateLimitEntry>();

// Submission rate limit: 5 submissions per 15 minutes per IP
const SUBMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

// Admin Login rate limit: 5 failed attempts per 15 minutes per IP
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

export function checkRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + SUBMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    const remainingSeconds = Math.ceil((entry.resetAt - now) / 1000);
    logSecurityEvent("RATE_LIMIT_EXCEEDED", ip, "/api/submit", { remainingSeconds });
    return { allowed: false, remainingSeconds };
  }

  entry.count += 1;
  return { allowed: true };
}

export function checkAdminLoginRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const entry = loginRateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    loginRateLimitMap.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_LOGIN_ATTEMPTS) {
    const remainingSeconds = Math.ceil((entry.resetAt - now) / 1000);
    logSecurityEvent("ADMIN_LOGIN_RATE_LIMIT", ip, "/api/admin/login", { remainingSeconds });
    return { allowed: false, remainingSeconds };
  }

  entry.count += 1;
  return { allowed: true };
}

// ─── Express Middleware Adapters ───
export function submitRateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  const rateLimitStatus = checkRateLimit(ip);
  if (!rateLimitStatus.allowed) {
    res.status(429).json({
      success: false,
      error: `Too many submissions. Please try again in ${rateLimitStatus.remainingSeconds} seconds.`,
    });
    return;
  }
  next();
}

export function adminLoginRateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || "127.0.0.1";
  const rateLimitStatus = checkAdminLoginRateLimit(ip);
  if (!rateLimitStatus.allowed) {
    res.status(429).json({
      success: false,
      error: `Too many login attempts. Please try again in ${rateLimitStatus.remainingSeconds} seconds.`,
    });
    return;
  }
  next();
}

// Server-side Cloudflare Turnstile token verification
export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Dev test key fallback

  // Cloudflare dedicated dummy test key always succeeds
  if (secretKey === "1x0000000000000000000000000000000AA" && token.startsWith("1x00000000")) {
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const outcome = (await response.json()) as { success: boolean; "error-codes"?: string[] };
    if (!outcome.success) {
      logSecurityEvent("TURNSTILE_FAILED", remoteIp || "unknown", "turnstile_verification", {
        errors: outcome["error-codes"],
      });
    }
    return outcome.success;
  } catch (err) {
    console.error("Turnstile API verification failed:", err);
    logSecurityEvent("TURNSTILE_FAILED", remoteIp || "unknown", "turnstile_verification", {
      error: String(err),
    });
    return false;
  }
}
