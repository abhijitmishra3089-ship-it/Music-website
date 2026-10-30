import { listSongs, getSong, getPlayback, recordPlay } from "./songs.service.js";
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
