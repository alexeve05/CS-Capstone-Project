import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="w-1/3 flex justify-start">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900 hover:text-slate-600 transition">
            The Muncie Sampler
          </Link>
        </div>

        <div className="w-1/3 flex justify-center gap-8 font-medium text-sm text-slate-600">
          <Link href="/albums" className="hover:text-slate-900 transition">
            Albums
          </Link>
          <Link href="/submit" className="hover:text-slate-900 transition">
            Submit Music
          </Link>
        </div>

        <div className="w-1/3 flex justify-end">
          <Link 
            href="/login" 
            className="text-sm font-medium text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-md transition"
          >
            Sign In
          </Link>
        </div>

      </div>
    </nav>
  );
}