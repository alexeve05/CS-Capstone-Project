import { create } from "zustand";

export interface Track {
  id: string;
  title: string;
  band: string;
  audioPath: string;
  coverArt?: string; 
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  isExpanded: boolean;
  volume: number;
  isMuted: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  pause: () => void;
  toggleExpanded: () => void;
  closePlayer: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  isExpanded: true,
  volume: 1,
  isMuted: false,
  
  playTrack: (track) => set({ currentTrack: track, isPlaying: true, isExpanded: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  pause: () => set({ isPlaying: false }),
  
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  closePlayer: () => set({ currentTrack: null, isPlaying: false }),
  setVolume: (volume) => 
    set({ 
      volume: Math.max(0, Math.min(1, volume)),
      isMuted: volume === 0,}),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })), 
}));