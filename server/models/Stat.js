/**
 * Named numeric counters with unique key and timestamps. Public routes expose only views; adding stored counters does not automatically expose them.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import mongoose from mongoose; use its public API here rather than modifying installed dependency files. */
import mongoose from "mongoose";

/* Unique counter key and numeric value; routes currently expose only views. */
const statSchema = new mongoose.Schema(
  {
    /* Record/counter identity; public stats use views. */
    key: { type: String, required: true, unique: true, index: true, trim: true },
    /* Stored/local value; use atomic $inc for concurrent counter updates. */
    value: { type: Number, required: true, default: 0 }
  },
  { /* Maintain createdAt and updatedAt automatically. */ timestamps: true }
);

export default mongoose.model("Stat", statSchema);
