import "./env";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "node:path";
import fs from "node:fs";
import { submitRouter } from "./routes/submit";
import { adminRouter } from "./routes/admin";
import { publicRouter } from "./routes/public";

const app = express();
const PORT = process.env.PORT || 3000;

// Security Headers (OWASP Hardening)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://challenges.cloudflare.com"],
        scriptSrcElem: ["'self'", "'unsafe-inline'", "https://challenges.cloudflare.com"],
        frameSrc: ["'self'", "https://challenges.cloudflare.com"],
        childSrc: ["'self'", "https://challenges.cloudflare.com", "blob:"],
        workerSrc: ["'self'", "https://challenges.cloudflare.com", "blob:"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'", "https://challenges.cloudflare.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS & Parsing Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Request Logger Middleware
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl || req.url}`);
  next();
});

// Public Media Uploads Directory (images, videos, brochures)
const publicUploadsDir = path.join(process.cwd(), process.env.PUBLIC_UPLOAD_DIR || "public_uploads");
if (!fs.existsSync(publicUploadsDir)) {
  fs.mkdirSync(publicUploadsDir, { recursive: true });
}
app.use("/public-uploads", express.static(publicUploadsDir));

// API Routes
app.use("/api/submit", submitRouter);
app.use("/api/admin", adminRouter);
app.use("/api", publicRouter);

// Serve Frontend Static Files from dist/
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));

// React Router SPA Catch-All Fallback (returns index.html for non-API routes)
app.use((req, res, next) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/public-uploads/")) {
    res.status(404).json({ success: false, error: "Resource not found" });
    return;
  }
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

// Global Production Error Handling Middleware (Prevents stack trace leaks)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[SERVER ERROR]", err);
  const isProd = process.env.NODE_ENV === "production";
  res.status(err.status || 500).json({
    success: false,
    error: isProd ? "Internal server error" : err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`➜ Server listening on: http://localhost:${PORT}`);
});
