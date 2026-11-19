"use client";

import { usePlayerStore, type Track } from "@/store/usePlayerStore";

export default function Home() {
  const { playQueue, currentTrack, isPlaying, togglePlay } = usePlayerStore();

  const testTracks: Track[] = [
    {
      id: "test-1",
      title: "Test Track",
      band: "Example Band",
      audioPath: "/testAudio/TestTrack.wav",
      coverArt: "/testImages/Album.jpeg",
      albumId: "Compilation-1",
      albumTitle: "Muncie Sampler Vol. 1",
      albumTrackCount: 2,
      albumTotalDuration: 245,
    },
    {
      id: "test-2",
      title: "Test Track 2",
      band: "Example Band 2",
      audioPath: "/testAudio/TestTrack2.wav",
      coverArt: "/testImages/Album.jpeg",
      albumId: "Compilation-1",
      albumTitle: "Muncie Sampler Vol. 1",
      albumTrackCount: 2,
      albumTotalDuration: 245,
    },
  ];

  const handleTrackClick = (track: Track, index: number) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playQueue(testTracks, index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
        The Muncie Sampler
      </h1>
      <p className="mt-3 text-lg text-stone-600">Test audio player.</p>

      <div className="mt-10 space-y-4">
        {testTracks.map((track, index) => {
          const isCurrentThisTrack = currentTrack?.id === track.id;

          return (
            <div
              key={track.id}
              className="p-6 bg-white border-2 border-stone-900 rounded-2xl flex items-center justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-stone-900 mt-2">
                  {track.title}
                </h2>
                <p className="text-sm text-stone-500">{track.band}</p>
              </div>

              <button
                onClick={() => handleTrackClick(track, index)}
                className="px-5 py-3 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition flex items-center gap-2 cursor-pointer"
              >
                {isCurrentThisTrack && isPlaying ? (
                  <span>Pause</span>
                ) : (
                  <span>Play</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}