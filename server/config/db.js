import mongoose from "mongoose";

let cachedPromise = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Connection is currently being established
  if (cachedPromise) {
    return cachedPromise;
  }

  cachedPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then((mongooseInstance) => {
      console.log(
        `MongoDB connected: ${mongooseInstance.connection.host}`
      );

      return mongooseInstance.connection;
    })
    .catch((error) => {
      cachedPromise = null;
      console.error("MongoDB connection failed:", error.message);
      throw error;
    })
    .finally(() => { cachedPromise = null; });

  return cachedPromise;
}