import Message from "../models/Message.js";

export async function createMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: "Name, email and message are required" });
    }
    if (message.trim().length < 10) {
      return res.status(400).json({ success: false, message: "Message must be at least 10 characters" });
    }

    const saved = await Message.create({ name, email, message });
    res.status(201).json({
      success: true,
      message: "Message received. Thank you.",
      data: { id: saved._id }
    });
  } catch (error) {
    next(error);
  }
}

export async function getMessages(req, res, next) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
}
