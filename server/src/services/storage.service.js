import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

const configured = Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET);
if (configured) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

function requireCloudinary() {
  if (!configured) {
    const error = new Error("Cloudinary storage is not configured");
    error.status = 503;
    throw error;
  }
}

// Audio assets use resource_type: "video" in Cloudinary. Keep the account API secret server-side only.
export async function uploadAudioFile(filePath, { folder = "dhun/audio", publicId } = {}) {
  requireCloudinary();
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
    type: "authenticated",
    folder,
    ...(publicId ? { public_id: publicId } : {}),
    unique_filename: true,
    overwrite: false
  });
  return { publicId: result.public_id, format: result.format, bytes: result.bytes, durationSeconds: result.duration, resourceType: result.resource_type };
}

export async function uploadCoverFile(filePath, { folder = "dhun/covers", publicId } = {}) {
  requireCloudinary();
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    type: "upload",
    folder,
    ...(publicId ? { public_id: publicId } : {}),
    unique_filename: true,
    overwrite: false
  });
  return { publicId: result.public_id, secureUrl: result.secure_url, width: result.width, height: result.height, format: result.format };
}

// Generates a signed authenticated-delivery URL. This is not an expiring URL; configure Cloudinary
// access controls/token-based delivery if your plan and product setup require expiry semantics.
export async function createPlaybackUrl(publicId, format = "mp3") {
  requireCloudinary();
  if (!publicId) {
    const error = new Error("Audio asset is missing");
    error.status = 404;
    throw error;
  }
  return cloudinary.url(publicId, {
    resource_type: "video",
    type: "authenticated",
    sign_url: true,
    secure: true,
    format
  });
}

export async function deleteAudioAsset(publicId) {
  requireCloudinary();
  return cloudinary.uploader.destroy(publicId, { resource_type: "video", type: "authenticated", invalidate: true });
}

export async function deleteCoverAsset(publicId) {
  requireCloudinary();
  return cloudinary.uploader.destroy(publicId, { resource_type: "image", type: "upload", invalidate: true });
}
