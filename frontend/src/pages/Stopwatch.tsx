import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { useRef, useState } from "react";

// Stopwatch / Timer App (useRef)


const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);


  // Store interval ID
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);


  // Start
  const startTime = () => {
    if (timerRef.current !== null) return;

    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  // Pause
  const pauseTime = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRunning(false);
  };

  // Reset
  const resetTime = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setTime(0);
    setIsRunning(false);
  };

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="mb-8 flex items-center justify-center gap-3 font-serif text-4xl font-bold text-slate-800">
          <Timer size={35} />
          Stopwatch
        </h1>

        {/* Time */}
        <div className="mx-auto flex h-80 w-80 flex-col items-center justify-center rounded-full border-4 border-blue-950">
          <h2 className="text-5xl font-bold text-slate-800">
            {String(hours).padStart(2, "0")} :{" "}
            {String(minutes).padStart(2, "0")} :{" "}
            {String(seconds).padStart(2, "0")}
          </h2>

          <div className="mt-2 flex justify-center gap-16 text-lg text-slate-400">
            <span>HH</span>
            <span>MM</span>
            <span>SS</span>
          </div>
        </div>

        {/* Start button */}
        <div className="flex justify-center gap-4 mt-10">
          {isRunning ? (
            <button
              onClick={pauseTime}
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400 active:scale-95"
            >
              <Pause />
              Pause
            </button>
          ) : (
            <button
              onClick={startTime}
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-800 px-8 py-4 font-bold text-white transition hover:bg-violet-500 active:scale-95"
            >
              <Play />
              Start
            </button>
          )}

          {/* Reset button */}
          <div>
            <button
              onClick={resetTime}
              className="rounded-xl px-8 py-4 flex gap-2 bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition"
            >
              <RotateCcw className="text-black-50 size-6" /> Reset
            </button>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default Stopwatch;
