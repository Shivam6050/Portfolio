import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"]
    },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 3000 },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
