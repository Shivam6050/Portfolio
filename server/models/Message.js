/**
 * Contact schema enforces persistence constraints beyond controller checks. Synchronize lengths with form/controller. read defaults false and is not visitor-controlled. timestamps adds createdAt/updatedAt; there is no public inbox-read route.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import mongoose from mongoose; use its public API here rather than modifying installed dependency files. */
import mongoose from "mongoose";

/* Persistence constraints plus read default; keep name/email/message limits aligned with controller and form. */
const messageSchema = new mongoose.Schema(
  {
    /* Record name or tool key; tool keys must match the icon registry. */
    name: { type: String, required: true, trim: true, maxlength: 80 },
    /* Contact address or validated visitor field; update form/controller/schema together for constraint changes. */
    email: {
      /* Expected model value type; coordinate changes with validation and callers. */
      type: String,
      /* Reject missing values during persistence validation. */
      required: true,
      /* Normalize leading/trailing whitespace during Mongoose casting. */
      trim: true,
      /* Normalize stored text casing. */
      lowercase: true,
      /* Maximum stored string length; synchronize with UI/controller limits. */
      maxlength: 160,
      /* Validation regex/error-message pair; keep email rules aligned across layers. */
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
    },
    /* Content/feedback text; keep internal database details out of API errors. */
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 3000 },
    /* Internal inbox flag; visitors must not be allowed to set it. */
    read: { type: Boolean, default: false }
  },
  { /* Maintain createdAt and updatedAt automatically. */ timestamps: true }
);

export default mongoose.model("Message", messageSchema);
