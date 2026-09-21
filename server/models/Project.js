import mongoose from "mongoose";

const stackItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true },
    tag: {
      type: String,
      required: true,
      enum: ["FLAGSHIP", "AI", "FULL-STACK"]
    },
    summary: { type: String, required: true, trim: true },
    detail: { type: String, required: true, trim: true },
    stack: { type: [stackItemSchema], required: true },
    demo: { type: String, default: "" },
    code: { type: String, default: "https://github.com/Shivam6050" },
    pattern: { type: String, enum: ["pattern-1", "pattern-2", "pattern-3"], required: true },
    thumbLabel: { type: String, required: true },
    thumbSub: { type: String, required: true },
    order: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
