import { NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  Search,
  Library,
  Heart,
  Plus,
  Music2,
  Headphones,
} from "lucide-react";

const menuItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Explore", path: "/explore", icon: Compass },
  { name: "Search", path: "/search", icon: Search },
  { name: "Your Library", path: "/library", icon: Library },
  { name: "Liked Songs", path: "/liked", icon: Heart },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/10 bg-[#101014] p-5 text-white">
      {/* Logo */}
      <NavLink to="/" className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Music2 size={25} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-wide">DHUN</h1>
          <p className="text-xs text-gray-400">Feel every beat</p>
        </div>
      </NavLink>

      {/* Navigation */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Menu
      </p>

      <nav className="space-y-2">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-purple-500/20 font-semibold text-purple-300"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={19} />
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Playlists */}
      <div className="mt-10 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Playlists
        </p>

        <button
          type="button"
          aria-label="Create playlist"
          onClick={() => alert("Playlist creation will be available soon!")}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <NavLink
          to="/library"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          <Headphones size={18} />
          My Playlists
        </NavLink>
      </div>

      {/* Bottom card */}
      <div className="mt-auto rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/20 to-pink-500/10 p-4">
        <Music2 className="mb-3 text-purple-300" size={25} />

        <h3 className="font-semibold">Music for your mood</h3>

        <p className="mt-1 text-xs leading-5 text-gray-400">
          Discover new sounds and enjoy your favourite tracks.
        </p>

        <NavLink
          to="/explore"
          className="mt-4 block rounded-lg bg-purple-500 px-3 py-2 text-center text-sm font-semibold transition hover:bg-purple-400"
        >
          Explore Music
        </NavLink>
      </div>
    </aside>
  );
}