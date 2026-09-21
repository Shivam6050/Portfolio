import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = Router();

const messageLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages. Please try again in a few minutes."
  }
});

router.post("/", messageLimiter, createMessage);
router.get("/", getMessages);

export default router;
