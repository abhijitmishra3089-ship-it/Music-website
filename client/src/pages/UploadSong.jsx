
import { useState } from "react";
import api from "../services/api";

export default function UploadSong() {
  const [form, setForm] = useState({
    title: "",
    artistName: "",
    albumName: ""
  });

  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!audio || !cover) {
      setError("Audio file aur cover image dono select karo.");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("artistName", form.artistName);
    formData.append("albumName", form.albumName);
    formData.append("audio", audio);
    formData.append("cover", cover);

    try {
      setLoading(true);

      const response = await api.post(
        "/songs/upload",
        formData
      );

      setMessage(
        response.data.message || "Song uploaded successfully!"
      );

      setForm({
        title: "",
        artistName: "",
        albumName: ""
      });

      setAudio(null);
      setCover(null);

      event.target.reset();

    } catch (err) {
      console.error("Song upload error:", err.response?.data || err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Song upload failed."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-xl sm:p-8">

        <h1 className="text-3xl font-bold">Upload Song</h1>

        <p className="mt-2 text-sm text-zinc-400">
          Add a new track to your DHUN music library.
        </p>

        {message && (
          <p role="status" className="mt-5 rounded-lg bg-green-500/10 p-3 text-green-400">
            {message}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-5 rounded-lg bg-red-500/10 p-3 text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          <div>
            <label htmlFor="title" className="mb-2 block text-sm">
              Song title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={150}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-purple-500"
              placeholder="Enter song title"
            />
          </div>

          <div>
            <label htmlFor="artistName" className="mb-2 block text-sm">
              Artist name
            </label>
            <input
              id="artistName"
              name="artistName"
              value={form.artistName}
              onChange={handleChange}
              required
              maxLength={120}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-purple-500"
              placeholder="Enter artist name"
            />
          </div>

          <div>
            <label htmlFor="albumName" className="mb-2 block text-sm">
              Album name (optional)
            </label>
            <input
              id="albumName"
              name="albumName"
              value={form.albumName}
              onChange={handleChange}
              maxLength={150}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-purple-500"
              placeholder="Enter album name"
            />
          </div>

          <div>
            <label htmlFor="audio" className="mb-2 block text-sm">
              Audio file
            </label>
            <input
              id="audio"
              type="file"
              accept=".mp3,.m4a,.aac,.wav,.ogg,.flac,audio/*"
              required
              onChange={(event) => setAudio(event.target.files?.[0] || null)}
              className="block w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm"
            />
          </div>

          <div>
            <label htmlFor="cover" className="mb-2 block text-sm">
              Cover image
            </label>
            <input
              id="cover"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              required
              onChange={(event) => setCover(event.target.files?.[0] || null)}
              className="block w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>

        </form>
      </div>
    </main>
  );
}
