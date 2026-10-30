import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  artistName: { type: String, required: true, trim: true, maxlength: 120 },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  albumName: { type: String, trim: true, maxlength: 200, default: "" },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  durationSeconds: { type: Number, required: true, min: 1, max: 86400 },
  storageKey: { type: String, required: true, select: false }, // Cloudinary public_id
  audioFormat: { type: String, default: "mp3", select: false },
  coverKey: { type: String, default: "" },
  isPublished: { type: Boolean, default: false, index: true },
  downloadAllowed: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null }
}, { timestamps: true, versionKey: false });
schema.index({ isPublished: 1, createdAt: -1, _id: -1 });
schema.index({ artistId: 1, isPublished: 1, createdAt: -1 });
schema.index({ title: "text", artistName: "text", albumName: "text" });
export default mongoose.model("Song", schema);
