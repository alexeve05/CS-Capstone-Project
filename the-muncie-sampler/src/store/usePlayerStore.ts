import { create } from "zustand";

export interface Track {
  id: string;
  title: string;
  band: string;
  audioPath: string;
  coverArt?: string;
  albumId?: string;
  albumTitle?: string;
  albumTrackCount?: number;
  albumTotalDuration?: number; 
}

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  isExpanded: boolean;
  volume: number;
  isMuted: boolean;
  playTrack: (track: Track) => void;
  playQueue: (tracks: Track[], startIndex?: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  togglePlay: () => void;
  pause: () => void;
  toggleExpanded: () => void;
  closePlayer: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  isExpanded: true,
  volume: 1,
  isMuted: false,

  playTrack: (track) =>
    set({
      currentTrack: track,
      queue: [track],
      currentIndex: 0,
      isPlaying: true,
      isExpanded: true,
    }),

  playQueue: (tracks, startIndex = 0) => {
    if (!tracks.length) return;
    const safeIndex = Math.max(0, Math.min(startIndex, tracks.length - 1));
    set({
      queue: tracks,
      currentIndex: safeIndex,
      currentTrack: tracks[safeIndex],
      isPlaying: true,
      isExpanded: true,
    });
  },

  nextTrack: () => {
    const { queue, currentIndex } = get();
    if (!queue.length || currentIndex >= queue.length - 1) return;
    const nextIndex = currentIndex + 1;
    set({
      currentIndex: nextIndex,
      currentTrack: queue[nextIndex],
      isPlaying: true,
    });
  },

  prevTrack: () => {
    const { queue, currentIndex } = get();
    if (!queue.length || currentIndex <= 0) return;
    const prevIndex = currentIndex - 1;
    set({
      currentIndex: prevIndex,
      currentTrack: queue[prevIndex],
      isPlaying: true,
    });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  pause: () => set({ isPlaying: false }),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  closePlayer: () =>
    set({
      currentTrack: null,
      queue: [],
      currentIndex: -1,
      isPlaying: false,
    }),
  setVolume: (volume) =>
    set({
      volume: Math.max(0, Math.min(1, volume)),
      isMuted: volume === 0,
    }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}));
