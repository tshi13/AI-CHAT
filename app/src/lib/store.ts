import { create } from "zustand";
import { Project, User } from "./types";
import { Channel, StreamChat } from "stream-chat";

interface State {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  chatClient: StreamChat | null;
  setChatClient: (chatClient: StreamChat) => void;
  clearChatClient: () => void;

  displayProjects: Project[];
  setDisplayProjects: (projects: Project[]) => void;
  addDisplayProject: (project: Project) => void;
  clearDisplayProjects: () => void;

  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;

  chatFlag: boolean;
  toggleChatFlag: () => void;

  channel: Channel | null;
  setChannel: (channel: Channel) => void;
  clearChannel: () => void;

  userProjects: Project[];
  setUserProjects: (projects: Project[]) => void;
  addUserProject: (project: Project) => void;
  removeUserProject: (project: Project) => void;

  participants: User[];
  setParticipants: (participants: User[]) => void;
}

export const useStore = create<State>()((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),

  chatClient: null,
  setChatClient: (chatClient: StreamChat) => set({ chatClient }),
  clearChatClient: () => set({ chatClient: null }),

  displayProjects: [],
  setDisplayProjects: (projects: Project[]) =>
    set({ displayProjects: projects }),
  addDisplayProject: (project: Project) =>
    set((state) => ({ displayProjects: [project, ...state.displayProjects] })),
  clearDisplayProjects: () => set({ displayProjects: [] }),

  selectedProject: null,
  setSelectedProject: (project: Project) => set({ selectedProject: project }),

  chatFlag: false,
  toggleChatFlag: () => set((state) => ({ chatFlag: !state.chatFlag })),

  channel: null,
  setChannel: (channel: Channel) => set({ channel }),
  clearChannel: () => set({ channel: null }),

  userProjects: [],
  setUserProjects: (projects: Project[]) => set({ userProjects: projects }),
  addUserProject: (project: Project) =>
    set((state) => ({ userProjects: [project, ...state.userProjects] })),
  removeUserProject: (project: Project) =>
    set((state) => ({
      userProjects: state.userProjects.filter(
        (userProject) => userProject.id !== project.id
      ),
    })),

  participants: [],
  setParticipants: (participants: User[]) => set({ participants }),
}));
