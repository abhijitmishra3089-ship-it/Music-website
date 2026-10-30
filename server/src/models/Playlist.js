import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  visibility: { type: String, enum: ["private", "public"], default: "private" }
}, { timestamps: true, versionKey: false });
schema.index({ userId: 1, updatedAt: -1 });
export default mongoose.model("Playlist", schema);
