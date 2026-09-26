/**
 * Route-local DB gate. Register after rate limiting only on actual database routes so missing routes and health remain fast. Forward connection errors with next(error).
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import connectDB from ../config/db.js; edit that module for the shared implementation. */
import { connectDB } from "../config/db.js";
/* Route-local DB gate. Register after rate limiting only on actual database routes so missing routes and health remain fast. Forward connection errors with next(error). */
export async function withDatabase(req, res, next) {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try { await connectDB(); next(); } catch (error) { next(error); }
}
