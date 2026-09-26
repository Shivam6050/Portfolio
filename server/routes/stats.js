/**
 * Views API: GET reads, POST atomically increments with upsert. Default limits are per process/IP; trust-proxy affects client IP identification. These counters are approximate analytics, not identity or billing records.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import withDatabase from ../middleware/withDatabase.js; edit that module for the shared implementation. */
import { withDatabase } from "../middleware/withDatabase.js";
/* Import Router from express; use its public API here rather than modifying installed dependency files. */
import { Router } from "express";
/* Import rateLimit from express-rate-limit; use its public API here rather than modifying installed dependency files. */
import rateLimit from "express-rate-limit";
/* Import Stat from ../models/Stat.js; edit that module for the shared implementation. */
import Stat from "../models/Stat.js";

/* Express subrouter; server.js provides the /api prefix for relative paths below. */
const router = Router();
/* View rate limiter; default store is in-memory per process. */
const viewLimiter = rateLimit({
  /* Rate-limit window in milliseconds; update docs if adjusting duration. */
  windowMs: 60 * 60 * 1000,
  /* Requests allowed per IP/window in the configured limiter store. */
  limit: 30,
  /* Modern rate-limit response-header format. */
  standardHeaders: "draft-7",
  /* Disable older X-RateLimit headers when false. */
  legacyHeaders: false,
  /* Content/feedback text; keep internal database details out of API errors. */
  message: { success: false, message: "View limit reached. Please try again later." }
});

/* Register this relative route under its server.js /api prefix. Keep write rate limiting before database connection. */
router.get("/", withDatabase, async (req, res, next) => {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Read only views records as plain objects. The API can return an empty array before a counter has been inserted. */
    const stats = await Stat.find({ key: "views" }).lean();
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.json({ success: true, data: stats });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) { next(error); }
});

/* Register this relative route under its server.js /api prefix. Keep write rate limiting before database connection. */
router.post("/view", viewLimiter, withDatabase, async (req, res, next) => {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Updated counter returned by atomic $inc/upsert, including the new views value. */
    const stat = await Stat.findOneAndUpdate({ key: "views" }, { $inc: { value: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true });
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.json({ success: true, data: stat });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) { next(error); }
});

/* Export router as this module default for its importer/host. */
export default router;
