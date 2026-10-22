
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDir = path.resolve("uploads");

const audioDir = path.join(uploadDir, "songs");
const coverDir = path.join(uploadDir, "covers");

fs.mkdirSync(audioDir, { recursive: true });
fs.mkdirSync(coverDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "audio") {
      cb(null, audioDir);
    } else if (file.fieldname === "cover") {
      cb(null, coverDir);
    } else {
      cb(new Error("Invalid file field"));
    }
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${crypto.randomUUID()}${ext}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"],
    cover: ["image/jpeg", "image/png", "image/webp"],
  };

  if (allowedTypes[file.fieldname]?.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Invalid file type"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 2,
  },
});

export default upload;
