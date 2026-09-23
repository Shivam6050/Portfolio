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

    // Email notification is intentionally best-effort: a mail-provider outage
    // must never make a successfully stored contact message look lost to the visitor.
    if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFICATION_EMAIL && process.env.CONTACT_FROM_EMAIL) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL,
            to: [process.env.CONTACT_NOTIFICATION_EMAIL],
            reply_to: email,
            subject: `Portfolio enquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
              <div style="font-family:Arial,sans-serif;line-height:1.6">
                <h2>New portfolio enquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr />
                <p style="white-space:pre-wrap">${message.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]))}</p>
              </div>
            `
          })
        });

        if (!response.ok) {
          console.error("Contact notification failed:", await response.text());
        }
      } catch (notificationError) {
        console.error("Contact notification error:", notificationError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Message received. Thank you.",
      data: { id: saved._id }
    });
  } catch (error) {
    next(error);
  }
}
