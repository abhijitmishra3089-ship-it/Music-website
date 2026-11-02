import { listSongs, getSong, getPlayback, recordPlay,uploadSong } from "./songs.service.js";
export async function listSongsController(req, res) {
  res.json({ success: true, ...(await listSongs(req.validatedQuery)) });
}
export async function getSongController(req, res) {
  res.json({ success: true, song: await getSong(req.params.songId) });
}
export async function playbackController(req, res) {
  res.json({ success: true, ...(await getPlayback(req.params.songId)) });
}
export async function historyController(req, res) {
  const result = await recordPlay({ userId: req.user.id, songId: req.params.songId, ...req.body });
  res.status(202).json({ success: true, ...result });
}

export async function uploadSongController(req, res) {
try {
  console.log("1. Upload started");

  console.log("2. Audio file:", audioFile.path);
  audioAsset = await uploadAudioFile(audioFile.path);

  console.log("3. Audio uploaded:", audioAsset.publicId);

  coverAsset = await uploadCoverFile(coverFile.path);

  console.log("4. Cover uploaded:", coverAsset.publicId);

  savedSong = await Song.create({
    title,
    artistName,
    albumName,
    durationSeconds: Math.round(audioAsset.durationSeconds || 0),
    storageKey: audioAsset.publicId,
    audioFormat: audioAsset.format || "mp3",
    coverKey: coverAsset.publicId,
    isPublished: true,
    uploadedBy: userId
  });

  console.log("5. Song saved:", savedSong._id);
}catch (error) {
  console.error("UPLOAD ERROR:", error);
  console.error("ERROR MESSAGE:", error.message);
  res.status(500).json({
    success: false,
    message: "Failed to upload song"
  }); 
}
}