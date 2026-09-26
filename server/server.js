/**
 * Express entry: environment, CORS, body parsing, logging, health, routers, then 404/error handlers. Tests/Vercel import without listening. Health only checks this process; route middleware connects MongoDB when needed.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import side effects from dotenv/config; use its public API here rather than modifying installed dependency files. */
import "dotenv/config";
/* Import express from express; use its public API here rather than modifying installed dependency files. */
import express from "express";
/* Import cors from cors; use its public API here rather than modifying installed dependency files. */
import cors from "cors";


/* Import projectRoutes from ./routes/projects.js; edit that module for the shared implementation. */
import projectRoutes from "./routes/projects.js";
/* Import messageRoutes from ./routes/messages.js; edit that module for the shared implementation. */
import messageRoutes from "./routes/messages.js";
/* Import statRoutes from ./routes/stats.js; edit that module for the shared implementation. */
import statRoutes from "./routes/stats.js";

/* Import notFound, errorHandler from ./middleware/errorHandler.js; edit that module for the shared implementation. */
import {
  notFound,
  errorHandler,
} from "./middleware/errorHandler.js";

/* Express application instance configured below and exported for serverless/test use. */
const app = express();
/* Suppress Express identification response header; this does not replace access controls. */
app.disable("x-powered-by");
// Set only to the verified number of reverse proxies in your deployment.
/* Guard: process.env.TRUST_PROXY_HOPS. Run the following branch only when true; preserve early returns when modifying this flow. */
if (process.env.TRUST_PROXY_HOPS) {
  /* Verified reverse-proxy count used to derive real client IP for rate limiting. */
  const hops = Number(process.env.TRUST_PROXY_HOPS);
  /* Guard: !Number.isInteger(hops) || hops < 1. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (!Number.isInteger(hops) || hops < 1) throw new Error("Invalid TRUST_PROXY_HOPS");
  /* Apply verified reverse-proxy hops so client IP extraction and rate limiting are consistent. */
  app.set("trust proxy", hops);
}

/* Local listening port; update the Vite proxy if changing the default. */
const PORT = process.env.PORT || 5000;

/* Allowed frontend CORS origin from server environment; not authentication. */
const clientOrigin =
  process.env.CLIENT_ORIGIN || "http://localhost:5173";

// --------------------------------------------------
// Middleware
// --------------------------------------------------

/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use(
  cors({
    /* Allowed CORS browser origin; not an authentication mechanism. */
    origin: clientOrigin,
    /* Allow credentialed CORS requests; current portfolio has no login flow. */
    credentials: true,
  })
);

/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use(express.json({ limit: "100kb" }));

// Request logger
/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use((req, res, next) => {
  /* Request start timestamp; finish listener calculates elapsed milliseconds. */
  const started = Date.now();

  /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
  res.on("finish", () => {
    /* Log diagnostics for this path; keep credentials and submitted message bodies out of logs. */
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${
        Date.now() - started
      }ms`
    );
  });

  /* Continue to the next middleware/route after this step succeeds. */
  next();
});

// --------------------------------------------------
// Root
// --------------------------------------------------

/* Register this informational GET route without requiring a database connection. */
app.get("/", (req, res) => {
  /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
  res.json({
    /* API envelope flag; frontend requires true as well as successful HTTP status. */
    success: true,
    /* Content/feedback text; keep internal database details out of API errors. */
    message: "Shivam Sagar Portfolio API is running",
    /* Informational API version string; update deliberately when changing the public contract. */
    version: "1.0.0",
    /* Discoverable API path map; align values with app.use/app.get mounts. */
    endpoints: {
      /* Process-health endpoint; it does not prove database connectivity. */
      health: "/api/health",
      /* Project API path/context field; visible React project content still comes from local constants. */
      projects: "/api/projects",
      /* Contact submission endpoint; there is no public inbox-reading route. */
      messages: "/api/messages",
      /* Approximate views API endpoint. */
      stats: "/api/stats"
    }
  });
});

// --------------------------------------------------
// Health
// --------------------------------------------------

/* Register this informational GET route without requiring a database connection. */
app.get("/api/health", (req, res) => {
  /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
  res.json({
    /* API envelope flag; frontend requires true as well as successful HTTP status. */
    success: true,
    /* Content/feedback text; keep internal database details out of API errors. */
    message: "API is running",
    /* Current UTC ISO timestamp for the health response. */
    time: new Date().toISOString(),
  });
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------



/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use("/api/projects", projectRoutes);

/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use("/api/messages", messageRoutes);

/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use("/api/stats", statRoutes);

// --------------------------------------------------
// Error handling
// --------------------------------------------------

/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use(notFound);

/* Install middleware/router in request order; missing-route and error handlers must remain last. */
app.use(errorHandler);

// --------------------------------------------------
// Local development
// --------------------------------------------------

/* Guard: !process.env.VERCEL && process.env.NODE_ENV !== "test". Run the following branch only when true; preserve early returns when modifying this flow. */
if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
  /* Start local HTTP listening; automatic startup is skipped for Vercel and test imports. */
  app.listen(PORT, () => {
    /* Log diagnostics for this path; keep credentials and submitted message bodies out of logs. */
    console.log(
      `Portfolio API running on http://localhost:${PORT}`
    );
  });
}

// --------------------------------------------------
// Vercel
// --------------------------------------------------

/* Export app as this module default for its importer/host. */
export default app;