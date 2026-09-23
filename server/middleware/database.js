import { connectDB } from "../config/db.js";

export async function requireDatabase(req, res, next) {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}
