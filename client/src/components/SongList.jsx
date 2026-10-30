import { Play, Pause, Music2 } from "lucide-react";
import { usePlayer } from "../hooks/usePlayer";
import { formatTime } from "../utils/formatTime";

export default function SongList({ songs = [] }) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  function handlePlay(song) {
    if (currentTrack?._id === song._id) {
      togglePlay();
    } else {
      playTrack(song, songs);
    }
  }

  if (!songs.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-12 text-center">
        <Music2 className="mx-auto mb-3 text-gray-500" size={35} />

        <p className="font-medium text-white">No songs found</p>

        <p className="mt-1 text-sm text-gray-500">
          Songs will appear here when available.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
            <th className="px-4 py-3 font-medium"># / Song</th>
            <th className="px-4 py-3 font-medium">Album</th>
            <th className="px-4 py-3 text-right font-medium">Duration</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, index) => {
            const isCurrentTrack = currentTrack?._id === song._id;
            const isActive = isCurrentTrack && isPlaying;

            return (
              <tr
                key={song._id || song.id || `${song.title}-${index}`}
                className="group border-b border-white/5 transition hover:bg-white/5"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handlePlay(song)}
                      aria-label={isActive ? "Pause song" : "Play song"}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-purple-500/20 hover:text-purple-300"
                    >
                      {isActive ? (
                        <Pause size={17} />
                      ) : (
                        <Play size={17} />
                      )}
                    </button>

                    <img
                      src={
                        song.coverUrl ||
                        song.coverKey ||
                        "https://placehold.co/80x80/18181f/ffffff?text=DHUN"
                      }
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 rounded-lg object-cover"
                    />

                    <div className="min-w-0">
                      <p
                        className={`truncate font-medium ${
                          isCurrentTrack
                            ? "text-purple-300"
                            : "text-white"
                        }`}
                      >
                        {song.title || "Untitled Track"}
                      </p>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {song.artistName || song.artist || "Unknown Artist"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="max-w-[180px] truncate px-4 py-3 text-sm text-gray-400">
                  {song.albumName || song.album || "Single"}
                </td>

                <td className="px-4 py-3 text-right text-sm text-gray-400">
                  {formatTime(song.durationSeconds || song.duration || 0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}