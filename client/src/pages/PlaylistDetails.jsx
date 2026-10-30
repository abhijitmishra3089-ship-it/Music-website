
import { Play, ListMusic } from "lucide-react";
import { useParams } from "react-router-dom";

export default function PlaylistDetails() {
  const { playlistId } = useParams();

  return (
    <div className="text-white">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-900 p-10">
        <ListMusic size={45} />
        <p className="mt-5 text-sm uppercase tracking-widest">Playlist</p>
        <h1 className="mt-2 text-4xl font-bold">My Playlist</h1>
        <p className="mt-2 text-gray-300">Playlist ID: {playlistId}</p>
        <button className="mt-6 rounded-full bg-purple-600 p-4">
          <Play fill="white" />
        </button>
      </div>
      <p className="mt-8 text-gray-400">No tracks in this playlist yet.</p>
    </div>
  );
}
