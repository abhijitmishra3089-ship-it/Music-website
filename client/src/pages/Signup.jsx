import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music2, LoaderCircle } from "lucide-react";
import api from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await api.post("/auth/signup", {
        displayName: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess("Account created successfully! Redirecting to login...");

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      } else {
        setError(response.data.message || "Unable to create your account.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl">
      <Music2 className="mx-auto text-purple-400" size={45} />

      <h1 className="mt-4 text-center text-3xl font-bold">
        Create Account
      </h1>

      <p className="mt-2 text-center text-gray-400">
        Join the DHUN music community
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-gray-300">
            Full name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            minLength={2}
            maxLength={80}
            required
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none transition focus:border-purple-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-gray-300">
            Email address
          </label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none transition focus:border-purple-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm text-gray-300"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none transition focus:border-purple-500"
          />

          <p className="mt-2 text-xs text-gray-500">
            Use at least 8 characters.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400"
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 p-4 font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle size={20} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already registered?{" "}
        <Link
          to="/login"
          className="font-medium text-purple-400 hover:text-purple-300"
        >
          Login
        </Link>
      </p>
    </div>
  );
}