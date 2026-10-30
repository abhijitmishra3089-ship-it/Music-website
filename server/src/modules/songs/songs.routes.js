import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { authenticate } from "../../middleware/authenticate.js";
import { listSongsQuery, songIdParams, historySchema } from "./songs.schemas.js";
import { listSongsController, getSongController, playbackController, historyController } from "./songs.controller.js";

const router = Router();
router.get("/", (req, res, next) => {
  const p = listSongsQuery.safeParse(req.query);
  if (!p.success) return res.status(400).json({ message: "Invalid query parameters" });
  req.validatedQuery = p.data; next();
}, asyncHandler(listSongsController));

router.get("/:songId", (req, res, next) => {
  if (!songIdParams.safeParse(req.params).success) return res.status(400).json({ message: "Invalid song id" });
  next();
}, asyncHandler(getSongController));

router.get("/:songId/playback", authenticate, (req, res, next) => {
  if (!songIdParams.safeParse(req.params).success) return res.status(400).json({ message: "Invalid song id" });
  next();
}, asyncHandler(playbackController));

router.post("/:songId/history", authenticate, (req, res, next) => {
  const p = songIdParams.safeParse(req.params);
  const b = historySchema.safeParse(req.body);
  if (!p.success || !b.success) return res.status(400).json({ message: "Invalid request" });
  req.body = b.data; next();
}, asyncHandler(historyController));

export default router;
