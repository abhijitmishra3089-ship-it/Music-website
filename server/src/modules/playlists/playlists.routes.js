import { Router } from "express";
import mongoose from "mongoose";
import { authenticate } from "../../middleware/authenticate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { validate } from "../../middleware/validate.js";
import Playlist from "../../models/Playlist.js";
import PlaylistTrack from "../../models/PlaylistTrack.js";
import Song from "../../models/Song.js";
import { createPlaylistSchema, updatePlaylistSchema, addTrackSchema } from "./playlists.schemas.js";

const router = Router();
router.use(authenticate);

router.get("/", asyncHandler(async (req, res) => {
  const playlists = await Playlist.find({ userId: req.user.id }).sort({ updatedAt: -1 }).limit(100).lean();
  res.json({ success: true, playlists });
}));
router.post("/", validate(createPlaylistSchema), asyncHandler(async (req, res) => {
  const playlist = await Playlist.create({ ...req.body, userId: req.user.id });
  res.status(201).json({ success: true, playlist });
}));
router.patch("/:id", validate(updatePlaylistSchema), asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid playlist id" });
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id }, { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  res.json({ success: true, playlist });
}));
router.delete("/:id", asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid playlist id" });
  const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  await PlaylistTrack.deleteMany({ playlistId: playlist._id });
  res.status(204).end();
}));
router.post("/:id/tracks", validate(addTrackSchema), asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid playlist id" });
  const playlist = await Playlist.findOne({ _id: req.params.id, userId: req.user.id });
  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  const song = await Song.findOne({ _id: req.body.songId, isPublished: true }).select("_id").lean();
  if (!song) return res.status(404).json({ message: "Song not found" });
  const count = await PlaylistTrack.countDocuments({ playlistId: playlist._id });
  const track = await PlaylistTrack.create({
    playlistId: playlist._id, songId: song._id,
    position: req.body.position ?? count, addedBy: req.user.id
  });
  res.status(201).json({ success: true, track });
}));
router.delete("/:id/tracks/:songId", asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(req.params.songId)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const playlist = await Playlist.findOne({ _id: req.params.id, userId: req.user.id }).select("_id").lean();
  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  await PlaylistTrack.deleteOne({ playlistId: playlist._id, songId: req.params.songId });
  res.status(204).end();
}));
export default router;
