import { connectDB } from "../config/db.js";
export async function withDatabase(req, res, next) {
  try { await connectDB(); next(); } catch (error) { next(error); }
}
