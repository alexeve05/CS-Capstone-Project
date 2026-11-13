import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
        The Muncie Sampler
      </h1>

      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
        Munice Sampler.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/albums"
          className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition shadow-sm"
        >
          Browse the Archive
        </Link>
        <Link
          href="/submit"
          className="px-8 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition shadow-sm"
        >
          Submit Your Music
        </Link>
      </div>
    </div>
  );
}
