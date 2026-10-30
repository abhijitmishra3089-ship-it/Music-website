
import { Library as LibraryIcon, ListMusic, Heart, Clock } from "lucide-react";

const items = [
  { name: "Liked Songs", count: "Your favourite tracks", icon: Heart },
  { name: "My Playlists", count: "Your personal collections", icon: ListMusic },
  { name: "Recently Played", count: "Your listening history", icon: Clock },
];

export default function Library() {
  return (
    <div className="text-white">
      <h1 className="flex items-center gap-3 text-3xl font-bold">
        <LibraryIcon className="text-purple-400" /> Your Library
      </h1>
      <div className="mt-8 space-y-4">
        {items.map(({ name, count, icon: Icon }) => (
          <div key={name} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
            <div className="rounded-xl bg-purple-600/20 p-4 text-purple-400">
              <Icon size={25} />
            </div>
            <div>
              <h2 className="font-semibold">{name}</h2>
              <p className="text-sm text-gray-400">{count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
