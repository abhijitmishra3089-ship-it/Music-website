
import { Music, Headphones, Radio, Mic2 } from "lucide-react";

const categories = [
  { name: "Bollywood", icon: Music, color: "from-pink-600 to-purple-900" },
  { name: "Pop", icon: Headphones, color: "from-blue-600 to-indigo-900" },
  { name: "Classical", icon: Radio, color: "from-orange-600 to-red-900" },
  { name: "Indie", icon: Mic2, color: "from-green-600 to-teal-900" },
];

export default function Explore() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Explore Music</h1>
      <p className="mt-2 text-gray-400">Discover music from every corner.</p>

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {categories.map(({ name, icon: Icon, color }) => (
          <div key={name} className={`rounded-2xl bg-gradient-to-br ${color} p-6 transition hover:-translate-y-1`}>
            <Icon size={35} />
            <h2 className="mt-8 text-xl font-bold">{name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
