
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Search Music</h1>
      <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
        <SearchIcon className="text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Songs, artists, albums..."
          className="w-full bg-transparent outline-none placeholder:text-gray-500"
        />
      </div>
      <p className="mt-6 text-gray-400">
        {query ? `Searching for "${query}"...` : "Start searching for your favourite music."}
      </p>
    </div>
  );
}
