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
  id?: number;
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
  id?: string;
  title: string;
  summary: string;
  detail: string;
  userId: number;
  deadline?: Date;
  teamSize: number;
  cratedAt?: Date;
};


export type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};
