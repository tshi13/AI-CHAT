export enum Role {
  STUDENT = "student",
  ORG = "org",
}

export type Skill = {
  name: string;
  score: number;
  visible: boolean;
};

export type User = {
  username: string;
  name: string;
  role: Role;
  profile?: Profile;
};

export type Profile = {
  education?: string;
  bio?: string;
  skills?: Skill[];
};

export type Project = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  maxTeam: number;
  published: boolean;
  duration: number;
  creator: User["username"];
  participants: User["username"][];
};
