import express from 'express'
import {songSchema} from "../validators/song.validate.js"
import {getSongs,getSongById,getPlaybackUrl,downloadSong,createSong} from "../controllers/song.controllers.js";

const router = express.Router();

router.get("/", getSongs);
router.get("/:songId", getSongById);
router.get("/:songId/playback", songSchema, getPlaybackUrl);
router.post("/:songId/download", songSchema, downloadSong);
router.post("/create", songSchema, createSong);
export default router;
