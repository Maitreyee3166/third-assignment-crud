import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md">
        <p className="text-7xl font-extrabold tracking-wider text-yellow-400">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold text-white">Page Not Found</h1>

        <p className="mt-3 text-purple-200">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-7 inline-block rounded-xl bg-yellow-400 px-7 py-3 font-bold text-gray-900 shadow-lg transition duration-300 hover:scale-105 hover:bg-yellow-300 active:scale-95"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

