import { z } from "zod";
export const listSongsQuery = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),
  cursor: z.string().optional()
}).strict();
export const songIdParams = z.object({
  songId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid song id")
}).strict();
export const historySchema = z.object({
  eventId: z.string().min(8).max(100),
  durationPlayed: z.number().min(0).max(86400),
  playedAt: z.coerce.date().optional()
}).strict();
