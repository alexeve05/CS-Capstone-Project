"use client";

import { useRef, useEffect, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Play, Pause, ChevronDown, X, Volume2, VolumeX } from "lucide-react";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    isExpanded,
    volume,
    isMuted,
    togglePlay,
    pause,
    toggleExpanded,
    closePlayer,
    setVolume,
    toggleMute,
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Sync play/pause with HTMLAudioElement
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Sync volume/mute with HTMLAudioElement
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
  }, [volume, isMuted, currentTrack]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [currentTrack?.id]);

  if (!currentTrack) return null;

  const handleSeekChange = (value: number) => {
    setCurrentTime(value);
  };

  const handleSeekCommit = (value: number) => {
    setIsSeeking(false);
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.audioPath}
        onLoadedMetadata={() => {
          if (audioRef.current && Number.isFinite(audioRef.current.duration)) {
            setDuration(audioRef.current.duration);
          }
        }}
        onTimeUpdate={() => {
          if (!isSeeking && audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onEnded={() => {
          pause();
          setCurrentTime(0);
        }}
      />

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
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
            </button>
            <button
              onClick={closePlayer}
              className="text-stone-400 hover:text-red-400 text-xs ml-2 transition cursor-pointer"
              aria-label="Close Player"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        // Expanded view
        <div className="fixed bottom-0 left-0 right-0 bg-stone-100 border-t-2 border-stone-900 text-stone-900 px-4 py-3 z-50 shadow-[0_-4px_0_0_rgba(28,25,23,0.05)] animate-in slide-in-from-bottom-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left (cover art, track info) */}
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
              <div className="truncate pr-2">
                <p className="text-sm font-bold text-stone-900 truncate">
                  {currentTrack.title}
                </p>
                <p className="text-xs font-medium text-stone-500 truncate">
                  {currentTrack.band}
                </p>
              </div>
            </div>

            {/* Center (play/pause, progress bar) */}
            <div className="flex flex-col items-center justify-center w-1/3 max-w-md">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition shadow-sm active:scale-95 cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={18} />
                ) : (
                  <Play size={18} className="translate-x-0.5" />
                )}
              </button>

              <div className="w-full flex items-center gap-2 mt-2 text-[11px] font-medium text-stone-600 tabular-nums">
                <span className="w-9 text-right">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onMouseDown={() => setIsSeeking(true)}
                  onTouchStart={() => setIsSeeking(true)}
                  onChange={(e) => handleSeekChange(Number(e.target.value))}
                  onMouseUp={(e) => handleSeekCommit(Number(e.currentTarget.value))}
                  onTouchEnd={(e) => handleSeekCommit(Number(e.currentTarget.value))}
                  onKeyUp={(e) => handleSeekCommit(Number(e.currentTarget.value))}
                  aria-label="Track progress"
                  className="w-full accent-stone-900 cursor-pointer h-1.5 bg-stone-300 rounded-lg"
                />
                <span className="w-9">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right (volume, minimize, close) */}
            <div className="flex items-center justify-end gap-2 w-1/3">
              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition cursor-pointer"
                  aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
                  title={isMuted || volume === 0 ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={18} />
                  ) : (
                    <Volume2 size={18} />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="w-20 accent-stone-900 cursor-pointer h-1.5 bg-stone-300 rounded-lg"
                />
              </div>

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