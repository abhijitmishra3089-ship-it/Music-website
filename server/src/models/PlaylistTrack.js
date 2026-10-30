import mongoose from "mongoose";

const schema = new mongoose.Schema({
  playlistId: { type: mongoose.Schema.Types.ObjectId, ref: "Playlist", required: true },
  songId: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
  position: { type: Number, required: true, min: 0 },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true, versionKey: false });
schema.index({ playlistId: 1, songId: 1 }, { unique: true });
schema.index({ playlistId: 1, position: 1 });
export default mongoose.model("PlaylistTrack", schema);
