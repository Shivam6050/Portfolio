import "dotenv/config";
import express from "express";
import cors from "cors";

import projectRoutes from "./routes/projects.js";
import messageRoutes from "./routes/messages.js";
import statRoutes from "./routes/stats.js";

import { requireDatabase } from "./middleware/database.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 5000;

const clientOrigin =
  process.env.CLIENT_ORIGIN || "http://localhost:5173";

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));

// Basic API security headers. This service returns JSON and does not need
// browser-executable framing or content sniffing.
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
});


// Request logger
app.use((req, res, next) => {
  const started = Date.now();

  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${
        Date.now() - started
      }ms`
    );
  });

  next();
});

// --------------------------------------------------
// Root
// --------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Shivam Sagar Portfolio API is running",
    version: "1.0.0",
    status: "ok",
    endpoints: {
      health: "/api/health",
      projects: "/api/projects",
      messages: "/api/messages",
      stats: "/api/stats"
    }
  });
});

// --------------------------------------------------
// Health
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    time: new Date().toISOString(),
  });
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------

app.use("/api/projects", requireDatabase, projectRoutes);

app.use("/api/messages", requireDatabase, messageRoutes);

app.use("/api/stats", requireDatabase, statRoutes);

// --------------------------------------------------
// Error handling
// --------------------------------------------------

app.use(notFound);

app.use(errorHandler);

// --------------------------------------------------
// Local development
// --------------------------------------------------

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `Portfolio API running on http://localhost:${PORT}`
    );
  });
}

// --------------------------------------------------
// Vercel
// --------------------------------------------------

export default app;