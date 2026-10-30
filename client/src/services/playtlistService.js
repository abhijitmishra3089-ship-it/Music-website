import api from "./api";

// Get songs with pagination and filters
export async function getSongs(params = {}) {
  const { data } = await api.get("/songs", { params });
  return data;
}

// Get one song by ID
export async function getSongById(songId) {
  if (!songId) {
    throw new Error("Song ID is required");
  }

  const { data } = await api.get(
    `/songs/${encodeURIComponent(songId)}`
  );

  return data?.song ?? data;
}

// Get authorized playback URL
export async function getPlaybackUrl(songId) {
  if (!songId) {
    throw new Error("Song ID is required");
  }

  const { data } = await api.get(
    `/songs/${encodeURIComponent(songId)}/playback`
  );

  return data?.playbackUrl ?? data?.url ?? data;
}

// Request song download
export async function downloadSong(songId) {
  if (!songId) {
    throw new Error("Song ID is required");
  }

  const { data } = await api.get(
    `/songs/${encodeURIComponent(songId)}/download`
  );

  return data;
}

// Search songs
export async function searchSongs(query, params = {}) {
  const searchQuery = query?.trim();

  if (!searchQuery) {
    return [];
  }

  return getSongs({
    ...params,
    search: searchQuery,
  });
}