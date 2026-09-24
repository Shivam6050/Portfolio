import mongoose from "mongoose";
const stackItemSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, label: { type: String, required: true, trim: true } }, { _id: false });
const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
  title: { type: String, required: true, trim: true, maxlength: 160 }, tag: { type: String, required: true, enum: ["FLAGSHIP", "AI", "FULL-STACK"] },
  summary: { type: String, required: true, trim: true, maxlength: 500 }, detail: { type: String, required: true, trim: true, maxlength: 2000 },
  stack: { type: [stackItemSchema], required: true, validate: { validator: (v) => v.length > 0, message: "At least one stack item is required" } },
  demo: { type: String, default: "", trim: true }, code: { type: String, default: "", trim: true }, pattern: { type: String, enum: ["pattern-1", "pattern-2", "pattern-3"], required: true },
  thumbLabel: { type: String, required: true, trim: true, maxlength: 80 }, thumbSub: { type: String, required: true, trim: true, maxlength: 80 }, order: { type: Number, required: true, default: 0, min: 0 }
}, { timestamps: true });
export default mongoose.model("Project", projectSchema);
