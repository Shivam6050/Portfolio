import { Router } from "express";
import rateLimit from "express-rate-limit";
import Stat from "../models/Stat.js";

const router = Router();
const viewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "View limit reached. Please try again later." }
});

router.get("/", async (req, res, next) => {
  try {
    const stats = await Stat.find({ key: "views" }).lean();
    res.json({ success: true, data: stats });
  } catch (error) { next(error); }
});

router.post("/view", viewLimiter, async (req, res, next) => {
  try {
    const stat = await Stat.findOneAndUpdate({ key: "views" }, { $inc: { value: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true });
    res.json({ success: true, data: stat });
  } catch (error) { next(error); }
});

export default router;
