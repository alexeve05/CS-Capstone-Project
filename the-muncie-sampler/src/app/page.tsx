"use client";

import { usePlayerStore } from "@/store/usePlayerStore";

export default function Home() {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

  const testTrack = {
    id: "test-1",
    title: "Test Track",
    band: "Example Band",
    audioPath: "/testAudio/TestTrack.wav",
    coverArt: "/testImages/Album.jpeg",
  };

  const isCurrentThisTrack = currentTrack?.id === testTrack.id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
        The Muncie Sampler
      </h1>
      <p className="mt-3 text-lg text-stone-600">Test audio player.</p>

      <div className="mt-10 p-6 bg-white border-2 border-stone-900 rounded-2xl  flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-900 mt-2">
            {testTrack.title}
          </h2>
          <p className="text-sm text-stone-500">{testTrack.band}</p>
        </div>

        <button
          onClick={() => {
            if (isCurrentThisTrack) {
              togglePlay();
            } else {
              playTrack(testTrack);
            }
          }}
          className="px-5 py-3 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition flex items-center gap-2 cursor-pointer"
        >
          {isCurrentThisTrack && isPlaying ? (
            <span>Pause</span>
          ) : (
            <span>Play</span>
          )}
        </button>
      </div>
    </div>
  );
}
