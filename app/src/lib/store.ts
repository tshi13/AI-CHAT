import { create } from "zustand";
import { User } from "./types";
import { Channel } from "stream-chat";

interface State {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  channel: Channel | null;
  setChannel: (channel: Channel) => void;
  clearChannel: () => void;
}

export const useStore = create<State>()((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),

  channel: null,
  setChannel: (channel: Channel) => set({ channel }),
  clearChannel: () => set({ channel: null }),
}));
