
import { Heart, Play } from "lucide-react";

export default function LikedSongs() {
  return (
    <div className="text-white">
      <div className="flex items-center gap-5 rounded-2xl bg-gradient-to-br from-purple-800 to-pink-900 p-8">
        <Heart size={55} fill="white" />
        <div>
          <p className="text-sm uppercase tracking-widest">Playlist</p>
          <h1 className="text-4xl font-bold">Liked Songs</h1>
          <p className="mt-2 text-gray-300">Your favourite music collection</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-white/10 p-5 text-center text-gray-400">
        No liked songs yet. Start adding your favourites!
      </div>
    </div>
  );
}
