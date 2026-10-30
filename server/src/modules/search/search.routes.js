import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import Song from "../../models/Song.js";

const router = Router();
router.get("/", asyncHandler(async (req, res) => {
  const q = String(req.query.q || "").trim();
  if (q.length < 2 || q.length > 100) return res.status(400).json({ message: "q must be 2-100 characters" });
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);
  const items = await Song.find({ isPublished: true, $text: { $search: q } })
    .select("title artistName albumName durationSeconds coverKey").limit(limit).lean();
  res.json({ success: true, items });
}));
export default router;
