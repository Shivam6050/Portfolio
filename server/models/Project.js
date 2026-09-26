/**
 * Database project contract for seed/read-only API; frontend constants remain separate. Keep enums/limits aligned with data producers. unique creates an index, not a normal validator; embedded stack records omit _id.
 * Editing map: CODE_GUIDE.md at repository root.
 */
/* Import mongoose from mongoose; use its public API here rather than modifying installed dependency files. */
import mongoose from "mongoose";
/* Embedded tool key/label schema; _id false avoids extra subdocument identifiers. */
const stackItemSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, label: { type: String, required: true, trim: true } }, { _id: false });
/* Required project fields, allowed badge/pattern enums, and timestamps; seed data must satisfy these constraints. */
const projectSchema = new mongoose.Schema({
  /* Stable project URL key; keep unique and coordinate renames with links and seed data. */
  slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
  /* Display heading; edit this value for copy rather than the presentation component. */
  title: { type: String, required: true, trim: true, maxlength: 160 }, tag: { type: String, required: true, enum: ["FLAGSHIP", "AI", "FULL-STACK"] },
  /* Short visitor-facing introduction; keep concise and factual. */
  summary: { type: String, required: true, trim: true, maxlength: 500 }, detail: { type: String, required: true, trim: true, maxlength: 2000 },
  /* Technology entries; keys must resolve in the appropriate logo registry. */
  stack: { type: [stackItemSchema], required: true, validate: { validator: (v) => v.length > 0, message: "At least one stack item is required" } },
  /* Full live-site URL; empty demo makes preview links fall back to source. */
  demo: { type: String, default: "", trim: true }, code: { type: String, default: "", trim: true }, pattern: { type: String, enum: ["pattern-1", "pattern-2", "pattern-3"], required: true },
  /* Legacy thumbnail label, retained in data but not shown by current gallery. */
  thumbLabel: { type: String, required: true, trim: true, maxlength: 80 }, thumbSub: { type: String, required: true, trim: true, maxlength: 80 }, order: { type: Number, required: true, default: 0, min: 0 }
}, { /* Maintain createdAt and updatedAt automatically. */ timestamps: true });
export default mongoose.model("Project", projectSchema);
