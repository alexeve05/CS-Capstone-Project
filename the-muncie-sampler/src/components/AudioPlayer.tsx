"use client";

import { useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Play, Pause, ChevronDown, X } from "lucide-react";

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    isExpanded,
    togglePlay,
    pause,
    toggleExpanded,
    closePlayer,
  } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  return (
    <>
      <audio ref={audioRef} src={currentTrack.audioPath} onEnded={pause} />

      {!isExpanded ? (
        // Minimized view
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-stone-900 p-1.5 pr-4 rounded-full shadow-xl border border-stone-700 animate-in slide-in-from-bottom-5">
          <button
            onClick={toggleExpanded}
            className="flex items-center gap-3 group cursor-pointer"
          >
            {currentTrack.coverArt ? (
              <img
                src={currentTrack.coverArt}
                alt="Cover"
                className="w-10 h-10 rounded-full object-cover group-hover:opacity-80 transition"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-[10px] text-stone-400 group-hover:opacity-80 transition">
                MS
              </div>
            )}
            <div className="text-left w-24">
              <p className="text-xs font-semibold text-stone-100 truncate">
                {currentTrack.title}
              </p>
            </div>
          </button>
          <div className="flex items-center gap-2 border-l border-stone-700 pl-3 ml-2">
            <button
              onClick={togglePlay}
              className="text-white hover:text-stone-300 transition cursor-pointer"
            >
              {isPlaying ? "pause" : "play"}
            </button>
            <button
              onClick={closePlayer}
              className="text-stone-400 hover:text-red-400 text-xs ml-2 transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        // Expanded view
        <div className="fixed bottom-0 left-0 right-0 bg-stone-100 border-t-2 border-stone-900 text-stone-900 px-4 py-3 z-50 shadow-[0_-4px_0_0_rgba(28,25,23,0.05)] animate-in slide-in-from-bottom-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 w-1/3 min-w-0">
              {currentTrack.coverArt ? (
                <img
                  src={currentTrack.coverArt}
                  alt="Cover"
                  className="w-14 h-14 rounded-md border border-stone-300 object-cover shadow-sm shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-md bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-500 border border-stone-300 shrink-0">
                  MS
                </div>
              )}
              <div className="truncate pr-4">
                <p className="text-sm font-bold text-stone-900 truncate">
                  {currentTrack.title}
                </p>
                <p className="text-xs font-medium text-stone-500 truncate">
                  {currentTrack.band}
                </p>
              </div>
            </div>
            {/*Center controls*/}  
            <div className="flex flex-col items-center justify-center w-1/3">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition shadow-sm active:scale-95 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} className="translate-x-0.5" />
                )}
              </button>
            </div>
            {/*Right controls*/}
            <div className="flex items-center justify-end gap-2 w-1/3">
              <button
                onClick={toggleExpanded}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition cursor-pointer"
                title="Minimize Player"
              >
                <ChevronDown size={20} />
              </button>
              <button
                onClick={closePlayer}
                className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                title="Close Player"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
