import mongoose from "mongoose";
import Song from "../../models/Song.js";
import { createPlaybackUrl } from "../../services/storage.service.js";
import { playHistoryQueue } from "../../queues/playHistory.queue.js";
import fs from "node:fs/promises";
import {
  uploadAudioFile,
  uploadCoverFile,
  deleteAudioAsset,
  deleteCoverAsset
} from "../../services/storage.service.js";

export async function uploadSong({
  title,
  artistName,
  albumName = "",
  audioFile,
  coverFile,
  userId
}) {
  if (!audioFile || !coverFile) {
    const error = new Error("Audio and cover image are required");
    error.status = 400;
    throw error;
  }

  let audioAsset;
  let coverAsset;
  let savedSong;

  try {
    audioAsset = await uploadAudioFile(audioFile.path);

    coverAsset = await uploadCoverFile(coverFile.path);

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

    return {
      id: String(savedSong._id),
      title: savedSong.title,
      artistName: savedSong.artistName,
      albumName: savedSong.albumName,
      durationSeconds: savedSong.durationSeconds,
      coverKey: savedSong.coverKey,
      isPublished: savedSong.isPublished
    };
  } catch (error) {
    // Database save fail ho to uploaded Cloudinary assets clean up karo.
    if (savedSong) {
      await Song.deleteOne({ _id: savedSong._id }).catch(() => {});
    }

    if (coverAsset?.publicId) {
      await deleteCoverAsset(coverAsset.publicId).catch(() => {});
    }

    if (audioAsset?.publicId) {
      await deleteAudioAsset(audioAsset.publicId).catch(() => {});
    }

    throw error;
  } finally {
    await Promise.allSettled([
      audioFile?.path
        ? fs.unlink(audioFile.path)
        : Promise.resolve(),

      coverFile?.path
        ? fs.unlink(coverFile.path)
        : Promise.resolve()
    ]);
  }
}
export async function listSongs({ limit, cursor }) {
  const filter = { isPublished: true };
  if (cursor) {
    if (!mongoose.isValidObjectId(cursor)) {
      const error = new Error("Invalid cursor"); error.status = 400; throw error;
    }
    const previous = await Song.findOne({ _id: cursor, isPublished: true })
      .select("_id createdAt").lean();
    if (!previous) return { items: [], nextCursor: null };
    filter.$or = [
      { createdAt: { $lt: previous.createdAt } },
      { createdAt: previous.createdAt, _id: { $lt: previous._id } }
    ];
  }
  const docs = await Song.find(filter)
    .select("title artistName albumName durationSeconds coverKey createdAt")
    .sort({ createdAt: -1, _id: -1 }).limit(limit + 1).lean();
  const hasMore = docs.length > limit;
  const items = hasMore ? docs.slice(0, limit) : docs;
  return {
    items: items.map(s => ({ ...s, id: String(s._id) })),
    nextCursor: hasMore ? String(items.at(-1)._id) : null
  };
}

export async function getSong(songId) {
  const song = await Song.findOne({ _id: songId, isPublished: true })
    .select("title artistName albumName durationSeconds coverKey createdAt").lean();
  if (!song) { const e = new Error("Song not found"); e.status = 404; throw e; }
  return { ...song, id: String(song._id) };
}

export async function getPlayback(songId) {
  const song = await Song.findOne({ _id: songId, isPublished: true })
    .select("+storageKey +audioFormat title durationSeconds").lean();
  if (!song) { const e = new Error("Song not found"); e.status = 404; throw e; }
  // Add subscription, region, account and licensing checks here.
  return {
    playbackUrl: await createPlaybackUrl(song.storageKey, song.audioFormat || "mp3"),
    delivery: "Cloudinary authenticated signed URL"
  };
}

export async function recordPlay({ userId, songId, eventId, durationPlayed, playedAt }) {
  const exists = await Song.exists({ _id: songId, isPublished: true });
  if (!exists) { const e = new Error("Song not found"); e.status = 404; throw e; }
  await playHistoryQueue.add("record", {
    userId, songId, eventId, durationPlayed,
    playedAt: (playedAt || new Date()).toISOString()
  }, { jobId: eventId });
  return { accepted: true, eventId };
}
