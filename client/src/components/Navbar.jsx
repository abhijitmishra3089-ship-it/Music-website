import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, UserRound, LogOut, Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-white/10 bg-[#101014]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-xl p-2 text-gray-300 hover:bg-white/10 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden text-sm text-gray-400 sm:block">
          Your sound. Your world.
        </div>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex max-w-md flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 transition focus-within:border-purple-400/60"
      >
        <Search size={19} className="shrink-0 text-gray-400" />

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search songs, artists..."
          aria-label="Search songs and artists"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />

        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      {/* User actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="hidden rounded-xl p-2.5 text-gray-400 transition hover:bg-white/10 hover:text-white sm:block"
          onClick={() => alert("No new notifications")}
        >
          <Bell size={20} />
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              aria-label="My profile"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-white"
            >
              {user.name?.charAt(0)?.toUpperCase() || (
                <UserRound size={20} />
              )}
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
              className="rounded-xl p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={19} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-xl px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-400"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}