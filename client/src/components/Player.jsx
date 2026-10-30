import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
} from "lucide-react";

import { usePlayer } from "../hooks/usePlayer";
import { formetTime } from "../utils/formetTime";

export default function Player() {
  const audioRef = useRef(null);

  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    previousTrack,
    setIsPlaying,
  } = usePlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioUrl =
    currentTrack?.audioUrl ||
    currentTrack?.streamUrl ||
    currentTrack?.playbackUrl ||
    "";

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audioUrl) {
      audio.pause();
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [audioUrl, isPlaying, setIsPlaying]);

  function handleSeek(event) {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function handleEnded() {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;

      audioRef.current.play().catch(() => setIsPlaying(false));
      return;
    }

    nextTrack();
  }

  function handleVolumeChange(event) {
    setVolume(Number(event.target.value));
    setIsMuted(false);
  }

  function handlePrevious() {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    previousTrack();
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl || undefined}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onDurationChange={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={handleEnded}
        onError={() => setIsPlaying(false)}
      />

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#111116]/95 px-3 py-3 text-white backdrop-blur-2xl sm:px-5">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-3">
          {/* Current song */}
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-[30%] sm:flex-none">
            {currentTrack ? (
              <>
                <img
                  src={
                    currentTrack.coverUrl ||
                    currentTrack.coverKey ||
                    "https://placehold.co/100x100/18181f/ffffff?text=DHUN"
                  }
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-xl object-cover sm:h-14 sm:w-14"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {currentTrack.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-400">
                    {currentTrack.artistName ||
                      currentTrack.artist ||
                      "Unknown Artist"}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Like song"
                  onClick={() => alert("Connect to the liked songs API.")}
                  className="hidden text-gray-500 transition hover:text-pink-400 sm:block"
                >
                  <Heart size={18} />
                </button>
              </>
            ) : (
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:h-14 sm:w-14">
                  <Volume2 size={22} className="text-purple-300" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">DHUN Player</p>
                  <p className="text-xs text-gray-500">Choose a song to play</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls and progress */}
          <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:w-[40%] sm:flex-none">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setIsShuffle((previous) => !previous)}
                aria-label="Toggle shuffle"
                aria-pressed={isShuffle}
                className={`hidden transition sm:block ${
                  isShuffle ? "text-purple-300" : "text-gray-500"
                }`}
              >
                <Shuffle size={17} />
              </button>

              <button
                type="button"
                onClick={handlePrevious}
                disabled={!currentTrack}
                aria-label="Previous song"
                className="text-gray-300 transition hover:text-white disabled:opacity-40"
              >
                <SkipBack size={21} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                disabled={!currentTrack || !audioUrl}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isPlaying ? (
                  <Pause size={19} fill="currentColor" />
                ) : (
                  <Play size={19} fill="currentColor" />
                )}
              </button>

              <button
                type="button"
                onClick={nextTrack}
                disabled={!currentTrack}
                aria-label="Next song"
                className="text-gray-300 transition hover:text-white disabled:opacity-40"
              >
                <SkipForward size={21} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={() => setIsRepeat((previous) => !previous)}
                aria-label="Toggle repeat"
                aria-pressed={isRepeat}
                className={`hidden transition sm:block ${
                  isRepeat ? "text-purple-300" : "text-gray-500"
                }`}
              >
                <Repeat size={17} />
              </button>
            </div>

            <div className="hidden w-full items-center gap-3 sm:flex">
              <span className="w-10 text-right text-[11px] text-gray-500">
                {formatTime(currentTime)}
              </span>

              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={Math.min(currentTime, duration || 100)}
                onChange={handleSeek}
                aria-label="Song progress"
                disabled={!currentTrack || !duration}
                className="h-1 w-full cursor-pointer accent-purple-500 disabled:cursor-not-allowed"
              />

              <span className="w-10 text-[11px] text-gray-500">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume */}
          <div className="hidden flex-1 items-center justify-end gap-3 sm:flex">
            <button
              type="button"
              onClick={() => setIsMuted((previous) => !previous)}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-gray-400 transition hover:text-white"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="w-24 cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Mobile progress */}
        <div className="mt-3 flex items-center gap-2 sm:hidden">
          <span className="text-[10px] text-gray-500">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={Math.min(currentTime, duration || 100)}
            onChange={handleSeek}
            aria-label="Song progress"
            disabled={!currentTrack || !duration}
            className="h-1 flex-1 accent-purple-500"
          />

          <span className="text-[10px] text-gray-500">
            {formatTime(duration)}
          </span>
        </div>
      </footer>
    </>
  );
}