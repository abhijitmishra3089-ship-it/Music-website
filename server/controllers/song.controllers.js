
import mongoose from "mongoose";
import Song from "../models/song.model.js";

// 1. GET /songs
// Paginated catalog + filters
export const getSongs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      genre,
      artist,
      sort = "latest",
    } = req.query;

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageLimit = Math.min(50, Math.max(1, Number(limit) || 10));

    const filter = {};
    // Search by song title
    if (search) {
      filter.title = {
        $regex: String(search).slice(0, 100),
        $options: "i",
      };
    }
    if (genre) filter.genre = genre;
    if (artist) filter.artist = artist;
    const sortOption =
      sort === "title"
        ? { title: 1 }
        : sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const [songs, total] = await Promise.all([
      Song.find(filter)
        .select("-audioUrl -downloadUrl")
        .sort(sortOption)
        .skip((pageNumber - 1) * pageLimit)
        .limit(pageLimit)
        .lean(),

      Song.countDocuments(filter),
    ]);
    return res.status(200).json({
      success: true,
      songs,
      pagination: {
        total,
        page: pageNumber,
        limit: pageLimit,
        totalPages: Math.ceil(total / pageLimit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 2. GET /songs/:songId
// Song details
export const getSongById = async (req, res) => {
  try {
    const { songId } = req.params;
    if (!mongoose.isValidObjectId(songId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid song ID",
      });
    }
    const song = await Song.findById(songId)
      .select("-audioUrl -downloadUrl")
      .lean();
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }
    return res.status(200).json({
      success: true,
      song,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 3. GET /songs/:songId/playback
// Return playback URL only after authorization
export const getPlaybackUrl = async (req, res) => {
  try {
    const { songId } = req.params;
    const user = req.user;
    if (!mongoose.isValidObjectId(songId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid song ID",
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please login to play this song",
      });
    }
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }
    // Premium songs require an active subscription
    if (
      song.isPremium &&
      user.subscriptionActive !== true
    ) {
      return res.status(403).json({
        success: false,
        message: "An active subscription is required",
      });
    }
    if (!song.audioUrl) {
      return res.status(404).json({
        success: false,
        message: "Playback is unavailable",
      });
    }
    return res.status(200).json({
      success: true,
      playbackUrl: song.audioUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 4. POST /songs/:songId/download
// Authorize eligible downloads
export const downloadSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const user = req.user;
    if (!mongoose.isValidObjectId(songId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid song ID",
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please login to download",
      });
    }
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }
    if (!song.downloadable) {
      return res.status(403).json({
        success: false,
        message: "Download is not available for this song",
      });
    }
    if (
      song.isPremium &&
      user.subscriptionActive !== true
    ) {
      return res.status(403).json({
        success: false,
        message: "An active subscription is required",
      });
    }
    if (!song.downloadUrl) {
      return res.status(404).json({
        success: false,
        message: "Download file is unavailable",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Download authorized",
      downloadUrl: song.downloadUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createSong = async (req, res) => {
  try {
    const { title, artist, genre } = req.body;

    // Uploaded files ke paths
    const audioPath = req.files?.audio?.[0]?.path;
    const coverPath = req.files?.cover?.[0]?.path;

    // Audio required hai
    if (!audioPath) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }

    const song = await Song.create({
      title,
      artist,
      genre,
      audioUrl: audioPath,
      coverImage: coverPath,
    });

    return res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      song,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};