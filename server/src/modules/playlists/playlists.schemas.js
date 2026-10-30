import { z } from "zod";
export const createPlaylistSchema = z.object({
  name: z.string().trim().min(1).max(100),
  visibility: z.enum(["private", "public"]).default("private")
}).strict();
export const updatePlaylistSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  visibility: z.enum(["private", "public"]).optional()
}).strict().refine(v => Object.keys(v).length > 0);
export const addTrackSchema = z.object({
  songId: z.string().regex(/^[a-f\d]{24}$/i),
  position: z.number().int().min(0).max(100000).optional()
}).strict();
