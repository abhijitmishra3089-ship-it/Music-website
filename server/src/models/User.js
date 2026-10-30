import mongoose from "mongoose";

const schema = new mongoose.Schema({
  displayName: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "artist", "admin"], default: "user" },
  status: { type: String, enum: ["active", "suspended"], default: "active" }
}, { timestamps: true, versionKey: false });
schema.index({ createdAt: -1 });
export default mongoose.model("User", schema);
