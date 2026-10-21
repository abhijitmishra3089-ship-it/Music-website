import {z} from "zod"
export const songSchema = z.object({
    title: z.string().trim().min(1),

    artistName: z.string().trim().optional(),
    artistId: z.string().optional(),

    albumName: z.string().trim().optional(),
    albumId: z.string().optional(),

    durationSeconds: z.number().int().positive(),
    storageKey: z.string().trim().min(1),

    coverKey: z.string().trim().nullable().optional(),
    isPublished: z.boolean().optional(),
    downloadAllowed: z.boolean().optional(),
  })
  .refine(
    (data) => data.artistName || data.artistId,
    {
      message: "Artist name or artist ID is required",
      path: ["artistId"],
    }
  )
  .refine(
    (data) => data.albumName || data.albumId,
    {
      message: "Album name or album ID is required",
      path: ["albumId"],
    }
  );
