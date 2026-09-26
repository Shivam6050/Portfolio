/**
 * Reuse open MongoDB connections and share concurrent connection attempts. Clear the cached promise after settlement so later disconnects can retry. MONGODB_URI stays server-side. Tune pool/timeout for deployment capacity.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import mongoose from mongoose; use its public API here rather than modifying installed dependency files. */
import mongoose from "mongoose";

/* Only the in-flight MongoDB connection attempt; clear after settlement for future retry. */
let cachedPromise = null;

/* Reuse open MongoDB connections and share concurrent connection attempts. Clear the cached promise after settlement so later disconnects can retry. MONGODB_URI stays server-side. Tune pool/timeout for deployment capacity. */
export async function connectDB() {
  /* Private server-side MongoDB connection string; never expose via VITE_ variables. */
  const uri = process.env.MONGODB_URI;

  /* Guard: !uri. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (!uri) {
    /* Stop with a clear error; caller/error boundary owns reporting and recovery. */
    throw new Error("MONGODB_URI is not configured");
  }

  // Already connected
  /* Guard: mongoose.connection.readyState === 1. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (mongoose.connection.readyState === 1) {
    /* Return mongoose.connection; this ends the current function path. */
    return mongoose.connection;
  }

  // Connection is currently being established
  /* Guard: cachedPromise. Run the following branch only when true; preserve early returns when modifying this flow. */
  if (cachedPromise) {
    /* Return cachedPromise; this ends the current function path. */
    return cachedPromise;
  }

  /* Start and cache one connection attempt shared by concurrent requests; return its connection and clear the cache when it settles. */
  cachedPromise = mongoose
    .connect(uri, {
      /* Maximum wait to locate a MongoDB server for this attempt. */
      serverSelectionTimeoutMS: 5000,
      /* Connection pool cap per process; tune to hosting/database capacity. */
      maxPoolSize: 10,
    })
    .then((mongooseInstance) => {
      /* Log diagnostics for this path; keep credentials and submitted message bodies out of logs. */
      console.log(
        `MongoDB connected: ${mongooseInstance.connection.host}`
      );

      /* Return mongooseInstance.connection; this ends the current function path. */
      return mongooseInstance.connection;
    })
    .catch((error) => {
      /* Clear the in-flight attempt so a later request can retry after failure or disconnect. */
      cachedPromise = null;
      /* Log diagnostics for this path; keep credentials and submitted message bodies out of logs. */
      console.error("MongoDB connection failed:", error.message);
      /* Stop with a clear error; caller/error boundary owns reporting and recovery. */
      throw error;
    })
    .finally(() => { /* Clear the in-flight attempt so a later request can retry after failure or disconnect. */ cachedPromise = null; });

  /* Return cachedPromise; this ends the current function path. */
  return cachedPromise;
}