import api from "./api";

// Get the current user's playlists
export async function getPlaylists(params = {}) {
  const { data } = await api.get("/playlists", { params });
  return data;
}

// Get playlist details
export async function getPlaylistById(playlistId) {
  if (!playlistId) {
    throw new Error("Playlist ID is required");
  }

  const { data } = await api.get(
    `/playlists/${encodeURIComponent(playlistId)}`
  );

  return data?.playlist ?? data;
}

// Create a playlist
export async function createPlaylist(playlistData) {
  const { data } = await api.post("/playlists", playlistData);
  return data;
}

// Update playlist name, visibility or other editable fields
export async function updatePlaylist(playlistId, updates) {
  if (!playlistId) {
    throw new Error("Playlist ID is required");
  }

  const { data } = await api.patch(
    `/playlists/${encodeURIComponent(playlistId)}`,
    updates
  );

  return data;
}

// Add a song to a playlist
export async function addSongToPlaylist(playlistId, songId) {
  if (!playlistId || !songId) {
    throw new Error("Playlist ID and song ID are required");
  }

  const { data } = await api.post(
    `/playlists/${encodeURIComponent(playlistId)}/songs`,
    { songId }
  );

  return data;
}

// Remove a song from a playlist
export async function removeSongFromPlaylist(playlistId, songId) {
  if (!playlistId || !songId) {
    throw new Error("Playlist ID and song ID are required");
  }

  const { data } = await api.delete(
    `/playlists/${encodeURIComponent(playlistId)}/songs/${encodeURIComponent(songId)}`
  );

  return data;
}

// Delete a playlist
export async function deletePlaylist(playlistId) {
  if (!playlistId) {
    throw new Error("Playlist ID is required");
  }

  const { data } = await api.delete(
    `/playlists/${encodeURIComponent(playlistId)}`
  );

  return data;
}