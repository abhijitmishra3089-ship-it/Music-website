
import { Link } from "react-router-dom";
import { Music2 } from "lucide-react";

export default function Login() {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-white">
      <Music2 className="mx-auto text-purple-400" size={45} />
      <h1 className="mt-4 text-center text-3xl font-bold">Welcome Back</h1>
      <p className="mt-2 text-center text-gray-400">Login to your DHUN account</p>
      <form className="mt-8 space-y-5">
        <input type="email" placeholder="Email address" required className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-purple-500" />
        <input type="password" placeholder="Password" required className="w-full rounded-xl border border-white/10 bg-black/30 p-4 outline-none focus:border-purple-500" />
        <button className="w-full rounded-xl bg-purple-600 p-4 font-semibold hover:bg-purple-500">Login</button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account? <Link to="/signup" className="text-purple-400">Sign up</Link>
      </p>
    </div>
  );
}
