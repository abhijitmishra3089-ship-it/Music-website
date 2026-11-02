import multer from "multer";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";

const allowedAudioTypes = new Set([
  "audio/mpeg",
  "audio/mp4",
  "audio/aac",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/flac",
  "audio/x-flac"
]);

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp"
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, os.tmpdir());
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  }
});

const upload = multer({
  storage,

  limits: {
    files: 2,
    fileSize: 50 * 1024 * 1024,
    fields: 5
  },

  fileFilter: (_req, file, callback) => {
    if (file.fieldname === "audio") {
      if (!allowedAudioTypes.has(file.mimetype)) {
        return callback(new Error("Unsupported audio format"));
      }

      return callback(null, true);
    }

    if (file.fieldname === "cover") {
      if (!allowedImageTypes.has(file.mimetype)) {
        return callback(new Error("Cover must be JPG, PNG or WebP"));
      }

      return callback(null, true);
    }

    callback(new Error("Unexpected upload field"));
  }
});

export default upload;