import mongoose from "mongoose";

const statSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true, trim: true },
    value: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Stat", statSchema);
