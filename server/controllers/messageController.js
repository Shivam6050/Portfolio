import Message from "../models/Message.js";

export async function createMessage(req, res, next) {
  try {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim().toLowerCase();
    const message = req.body?.message?.trim();

    if (!name || !email || !message) return res.status(400).json({ success: false, message: "Name, email and message are required" });
    if (name.length > 80) return res.status(400).json({ success: false, message: "Name must be 80 characters or fewer" });
    if (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: "Please provide a valid email" });
    if (message.length < 10) return res.status(400).json({ success: false, message: "Message must be at least 10 characters" });
    if (message.length > 3000) return res.status(400).json({ success: false, message: "Message must be 3000 characters or fewer" });

    const saved = await Message.create({ name, email, message });
    res.status(201).json({ success: true, message: "Message received. Thank you.", data: { id: saved._id } });
  } catch (error) {
    next(error);
  }
}
