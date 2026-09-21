import { Router } from "express";
import Stat from "../models/Stat.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const stats = await Stat.find().lean();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
});

router.post("/view", async (req, res, next) => {
  try {
    const stat = await Stat.findOneAndUpdate(
      { key: "views" },
      { $inc: { value: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, data: stat });
  } catch (error) {
    next(error);
  }
});

export default router;
