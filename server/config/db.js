import mongoose from "mongoose";

let cachedPromise = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // A previous promise may have resolved, but the socket can later
  // disconnect. Only reuse a promise while Mongoose is still connecting.
  if (mongoose.connection.readyState !== 2) {
    cachedPromise = null;
  }

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
    });

  return cachedPromise;
}

mongoose.connection.on("disconnected", () => {
  cachedPromise = null;
  console.warn("MongoDB disconnected; the next request will reconnect.");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});
