import mongoose from "mongoose";

const schema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  playedAt: { type: Date, required: true },
  durationPlayed: { type: Number, required: true, min: 0, max: 86400 }
}, { timestamps: true, versionKey: false });
schema.index({ userId: 1, playedAt: -1 });
schema.index({ songId: 1, playedAt: -1 });
export default mongoose.model("PlayHistory", schema);
