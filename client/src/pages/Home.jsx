
import { Play, TrendingUp, Music2, Clock } from "lucide-react";

const songs = [
  { id: 1, title: "Heeriye", artist: "Arijit Singh", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500" },
  { id: 2, title: "Kesariya", artist: "Arijit Singh", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500" },
  { id: 3, title: "Apna Bana Le", artist: "Arijit Singh", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500" },
  { id: 4, title: "Chaleya", artist: "Arijit Singh", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500" },
];

export default function Home() {
  return (
    <div className="space-y-10 text-white">
      <section className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-black p-8 md:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-300">Welcome to DHUN</p>
        <h1 className="max-w-xl text-4xl font-bold md:text-6xl">
          Feel every beat. <span className="text-purple-400">Live every moment.</span>
        </h1>
        <p className="mt-4 text-gray-300">Discover music that matches your mood.</p>
        <button className="mt-7 flex items-center gap-2 rounded-full bg-purple-600 px-7 py-3 font-semibold hover:bg-purple-500">
          <Play size={20} fill="currentColor" /> Explore Music
        </button>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <TrendingUp className="text-purple-400" />
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {songs.map(song => (
            <div key={song.id} className="group rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
              <div className="relative">
                <img src={song.image} alt={song.title} className="aspect-square w-full rounded-xl object-cover" />
                <button className="absolute bottom-3 right-3 rounded-full bg-purple-600 p-3 opacity-0 shadow-lg transition group-hover:opacity-100">
                  <Play size={18} fill="white" />
                </button>
              </div>
              <h3 className="mt-3 font-semibold">{song.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <Music2 className="mb-3 text-purple-400" />
          <h3 className="text-xl font-bold">Your Music Universe</h3>
          <p className="mt-2 text-sm text-gray-400">Explore songs from different genres and artists.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <Clock className="mb-3 text-purple-400" />
          <h3 className="text-xl font-bold">Recently Played</h3>
          <p className="mt-2 text-sm text-gray-400">Continue listening to your favourite tracks.</p>
        </div>
      </section>
    </div>
  );
}
