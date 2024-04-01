import { create } from "zustand";
import { User } from "./types";
import { Channel, DefaultGenerics, StreamChat } from "stream-chat";


interface State {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  channel: Channel<DefaultGenerics> | null;
  setChannel: (channel: Channel) => void;
  clearChannel: () => void;

  chatClient: StreamChat | null;
  setChatClient: (chatClient: StreamChat) => void;
  clearChatClient: () => void;
}

export const useStore = create<State>()((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),

  channel: null,
  setChannel: (channel: Channel) => set({ channel }),
  clearChannel: () => set({ channel: null }),

  chatClient: null,
  setChatClient: (chatClient: StreamChat) => set({ chatClient }),
  clearChatClient: () => set({ chatClient: null }),
}));
