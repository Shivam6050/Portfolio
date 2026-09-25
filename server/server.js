import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import projectRoutes from "./routes/projects.js";
import messageRoutes from "./routes/messages.js";
import statRoutes from "./routes/stats.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorHandler.js";

const app = express();
app.disable("x-powered-by");
// Set only to the verified number of reverse proxies in your deployment.
if (process.env.TRUST_PROXY_HOPS) {
  const hops = Number(process.env.TRUST_PROXY_HOPS);
  if (!Number.isInteger(hops) || hops < 1) throw new Error("Invalid TRUST_PROXY_HOPS");
  app.set("trust proxy", hops);
}

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
    message: "API is running",
    time: new Date().toISOString(),
  });
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------

app.use(["/api/projects", "/api/messages", "/api/stats"], async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/projects", projectRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/stats", statRoutes);

// --------------------------------------------------
// Error handling
// --------------------------------------------------

app.use(notFound);

app.use(errorHandler);

// --------------------------------------------------
// Local development
// --------------------------------------------------

if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
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