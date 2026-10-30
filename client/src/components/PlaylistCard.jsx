import { Link } from "react-router-dom";
import { Play, Music2 } from "lucide-react";

export default function PlaylistCard({ playlist }) {
  if (!playlist) return null;

  const playlistId = playlist._id || playlist.id;

  return (
    <Link
      to={playlistId ? `/playlists/${playlistId}` : "/library"}
      className="group block rounded-2xl border border-white/5 bg-[#18181f] p-3 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-[#20202a]"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30">
        {playlist.coverUrl || playlist.coverKey ? (
          <img
            src={playlist.coverUrl || playlist.coverKey}
            alt={`${playlist.name || "Playlist"} cover`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Music2 size={55} className="text-purple-200/70" />
          </div>
        )}

        <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-purple-500 text-white opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
          <Play size={19} fill="currentColor" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="truncate font-semibold text-white">
          {playlist.name || "Untitled Playlist"}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {playlist.trackCount ?? playlist.songs?.length ?? 0} songs
        </p>
      </div>
    </Link>
  );
}