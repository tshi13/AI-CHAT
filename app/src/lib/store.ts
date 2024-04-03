import { create } from "zustand";
import { User } from "./types";
import { StreamChat } from "stream-chat";


interface State {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  chatClient: StreamChat | null;
  setChatClient: (chatClient: StreamChat) => void;
  clearChatClient: () => void;
}

export const useStore = create<State>()((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),

  chatClient: null,
  setChatClient: (chatClient: StreamChat) => set({ chatClient }),
  clearChatClient: () => set({ chatClient: null }),
}));
