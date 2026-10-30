
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#09090f] text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 pb-28 md:p-8">
          <Outlet />
        </main>

      </div>

      {/* Music Player */}
      <Player />

    </div>
  );
}
