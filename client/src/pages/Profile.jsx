
import { User, Mail, Settings, LogOut } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-2xl text-white">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="flex items-center gap-5">
          <div className="rounded-full bg-purple-600/20 p-6 text-purple-400">
            <User size={40} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">DHUN User</h2>
            <p className="text-gray-400">Music Lover</p>
          </div>
        </div>
        <div className="mt-8 space-y-5">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="text-purple-400" /> user@example.com
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Settings className="text-purple-400" /> Account Settings
          </div>
          <button className="flex items-center gap-3 text-red-400">
            <LogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
