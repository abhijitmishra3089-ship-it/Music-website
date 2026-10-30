import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Play a song and optionally set its queue.
  const playTrack = useCallback((track, tracks = []) => {
    if (!track) return;

    const nextQueue =
      tracks.length > 0 ? tracks : [track];

    let index = nextQueue.findIndex(
      (item) =>
        String(item._id ?? item.id) ===
        String(track._id ?? track.id)
    );

    if (index === -1) {
      index = 0;
    }

    setQueue(nextQueue);
    setCurrentIndex(index);
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  // Play or pause the current song.
  const togglePlay = useCallback(() => {
    if (!currentTrack) return;

    setIsPlaying((previous) => !previous);
  }, [currentTrack]);

  // Play the next song.
  const nextTrack = useCallback(() => {
    if (!queue.length) return;

    let nextIndex;

    if (isShuffle && queue.length > 1) {
      const possibleIndexes = queue
        .map((_, index) => index)
        .filter((index) => index !== currentIndex);

      nextIndex =
        possibleIndexes[
          Math.floor(Math.random() * possibleIndexes.length)
        ];
    } else if (currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (isRepeat) {
      nextIndex = 0;
    } else {
      setIsPlaying(false);
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setIsPlaying(true);
  }, [queue, currentIndex, isShuffle, isRepeat]);

  // Play the previous song.
  const previousTrack = useCallback(() => {
    if (!queue.length) return;

    let previousIndex;

    if (currentIndex > 0) {
      previousIndex = currentIndex - 1;
    } else if (isRepeat) {
      previousIndex = queue.length - 1;
    } else {
      return;
    }

    setCurrentIndex(previousIndex);
    setCurrentTrack(queue[previousIndex]);
    setIsPlaying(true);
  }, [queue, currentIndex, isRepeat]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((previous) => !previous);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat((previous) => !previous);
  }, []);

  const value = useMemo(
    () => ({
      currentTrack,
      queue,
      currentIndex,
      isPlaying,
      isShuffle,
      isRepeat,
      setIsPlaying,
      playTrack,
      togglePlay,
      nextTrack,
      previousTrack,
      toggleShuffle,
      toggleRepeat,
    }),
    [
      currentTrack,
      queue,
      currentIndex,
      isPlaying,
      isShuffle,
      isRepeat,
      playTrack,
      togglePlay,
      nextTrack,
      previousTrack,
      toggleShuffle,
      toggleRepeat,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}