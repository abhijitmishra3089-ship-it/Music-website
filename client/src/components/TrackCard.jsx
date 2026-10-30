import { usePlayer } from "../hooks/usePlayer";
import { Play, Heart, MoreHorizontal } from "lucide-react";

export default function TrackCard({ track }) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  if (!track) return null;

  const isCurrentTrack = currentTrack?._id === track._id;

  function handlePlay() {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  }

  return (
    <article className="group min-w-0 rounded-2xl border border-white/5 bg-[#18181f] p-3 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-[#20202a]">
      {/* Cover */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/20">
        <img
          src={
            track.coverUrl ||
            track.coverKey ||
            "https://placehold.co/400x400/18181f/ffffff?text=DHUN"
          }
          alt={`${track.title || "Song"} cover`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={handlePlay}
          aria-label={isCurrentTrack && isPlaying ? "Pause track" : "Play track"}
          className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-purple-500 text-white opacity-0 shadow-lg shadow-purple-900/40 transition hover:scale-105 hover:bg-purple-400 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
        >
          <Play size={19} fill="currentColor" />
        </button>
      </div>

      {/* Track information */}
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">
            {track.title || "Untitled Track"}
          </h3>

          <p className="mt-1 truncate text-sm text-gray-400">
            {track.artistName || track.artist || "Unknown Artist"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Like track"
            onClick={() => alert("Connect this button to your liked songs API.")}
            className="rounded-lg p-1.5 text-gray-500 transition hover:text-pink-400"
          >
            <Heart size={17} />
          </button>

          <button
            type="button"
            aria-label="More track options"
            onClick={() => alert("More track options coming soon.")}
            className="rounded-lg p-1.5 text-gray-500 transition hover:text-white"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      
    </article>
  );
}