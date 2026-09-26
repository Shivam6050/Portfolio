/**
 * Normalize and validate untrusted contact input; save only name/email/message, never spread req.body. Limits mirror Contact and Message schema. 201 confirms database storage, not email delivery.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import Message from ../models/Message.js; edit that module for the shared implementation. */
import Message from "../models/Message.js";

/* Normalize and validate untrusted contact input; save only name/email/message, never spread req.body. Limits mirror Contact and Message schema. 201 confirms database storage, not email delivery. */
export async function createMessage(req, res, next) {
  /* Group fallible work with its catch/finally path; cleanup must still run after failures. */
  try {
    /* Guard: !["name", "email", "message"].every((key) => typeof req.body?.[key] === "string"). Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!["name", "email", "message"].every((key) => typeof req.body?.[key] === "string")) {
      /* Return res.status(400).json({ success: false, message: "Name, email and message must be strings" }); this ends the current function path. */
      return res.status(400).json({ success: false, message: "Name, email and message must be strings" });
    }

    /* Trim the validated name string before storage; internal whitespace is preserved. */
    const name = req.body?.name?.trim();
    /* Trim and lowercase the validated email before storage; regex/length checks follow. */
    const email = req.body?.email?.trim().toLowerCase();
    /* Trim the validated message before checking minimum/maximum length. */
    const message = req.body?.message?.trim();

    /* Guard: !name || !email || !message. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (!name || !email || !message) return res.status(400).json({ success: false, message: "Name, email and message are required" });
    /* Guard: name.length > 80. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (name.length > 80) return res.status(400).json({ success: false, message: "Name must be 80 characters or fewer" });
    /* Guard: email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email). Run the following branch only when true; preserve early returns when modifying this flow. */
    if (email.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: "Please provide a valid email" });
    /* Guard: message.length < 10. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (message.length < 10) return res.status(400).json({ success: false, message: "Message must be at least 10 characters" });
    /* Guard: message.length > 3000. Run the following branch only when true; preserve early returns when modifying this flow. */
    if (message.length > 3000) return res.status(400).json({ success: false, message: "Message must be 3000 characters or fewer" });

    /* Saved message document; return only its ID instead of visitor content. */
    const saved = await Message.create({ name, email, message });
    /* Send the HTTP/JSON envelope expected by the client: success plus data/message as applicable. */
    res.status(201).json({ success: true, message: "Message received. Thank you.", data: { id: saved._id } });
  } /* Handle failure from the try block; keep established safe feedback/forwarding behavior. */ catch (error) {
    /* Forward failure to Express error middleware; do not return raw database internals here. */
    next(error);
  }
}
