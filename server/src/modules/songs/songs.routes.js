import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import upload from "../../middleware/upload.middleware.js";

import {
  listSongsController,
  getSongController,
  playbackController,
  historyController,
  uploadSongController
} from "./songs.controller.js";

import {
  listSongsQuery,
  songIdParams,
  historySchema
} from "./songs.schemas.js";

const router = Router();

// Upload song: login + artist/admin role required
router.post(
  "/upload",
  authenticate,
  (req, res, next) => {
    
    const role = req.user?.role;

    if (!["artist", "admin"].includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Only artists and admins can upload songs"
      });
    }

    next();
  },
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 }
  ]),
  asyncHandler(uploadSongController)
);

// Existing listing route
router.get(
  "/",
  (req, res, next) => {
    const parsed = listSongsQuery.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid query parameters"
      });
    }

    req.validatedQuery = parsed.data;
    next();
  },
  asyncHandler(listSongsController)
);

// Existing song detail route
router.get(
  "/:songId",
  (req, res, next) => {
    if (!songIdParams.safeParse(req.params).success) {
      return res.status(400).json({
        success: false,
        message: "Invalid song id"
      });
    }

    next();
  },
  asyncHandler(getSongController)
);

// Existing playback route
router.get(
  "/:songId/playback",
  authenticate,
  (req, res, next) => {
    if (!songIdParams.safeParse(req.params).success) {
      return res.status(400).json({
        success: false,
        message: "Invalid song id"
      });
    }

    next();
  },
  asyncHandler(playbackController)
);

// Existing play-history route
router.post(
  "/:songId/history",
  authenticate,
  (req, res, next) => {
    const params = songIdParams.safeParse(req.params);
    const body = historySchema.safeParse(req.body);

    if (!params.success || !body.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request"
      });
    }

    req.body = body.data;
    next();
  },
  asyncHandler(historyController)
);

export default router;