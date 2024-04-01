import { create } from "zustand";
import { User } from "./types";

interface State {
  user: User | null;

  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useStore = create<State>()((set) => ({
  user: null,

  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
