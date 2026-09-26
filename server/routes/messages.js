/**
 * POST /api/messages. In-memory per-process rate limiting runs before DB connection; this is not a shared global quota. Change windowMs/limit here and use a shared store if cross-instance enforcement is needed.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import withDatabase from ../middleware/withDatabase.js; edit that module for the shared implementation. */
import { withDatabase } from "../middleware/withDatabase.js";
/* Import Router from express; use its public API here rather than modifying installed dependency files. */
import { Router } from "express";
/* Import rateLimit from express-rate-limit; use its public API here rather than modifying installed dependency files. */
import rateLimit from "express-rate-limit";
/* Import createMessage from ../controllers/messageController.js; edit that module for the shared implementation. */
import { createMessage } from "../controllers/messageController.js";

/* Express subrouter; server.js provides the /api prefix for relative paths below. */
const router = Router();

/* Contact rate limiter; default store is in-memory per process. */
const messageLimiter = rateLimit({
  /* Rate-limit window in milliseconds; update docs if adjusting duration. */
  windowMs: 10 * 60 * 1000,
  /* Requests allowed per IP/window in the configured limiter store. */
  limit: 3,
  /* Modern rate-limit response-header format. */
  standardHeaders: "draft-7",
  /* Disable older X-RateLimit headers when false. */
  legacyHeaders: false,
  /* Content/feedback text; keep internal database details out of API errors. */
  message: { success: false, message: "Too many messages. Please try again in a few minutes." }
});

/* Register this relative route under its server.js /api prefix. Keep write rate limiting before database connection. */
router.post("/", messageLimiter, withDatabase, createMessage);

/* Export router as this module default for its importer/host. */
export default router;
