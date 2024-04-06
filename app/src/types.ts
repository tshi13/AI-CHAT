export type User = {
  id: string;
  name: string;
};

export type Group = {
  id: string;
  name: string;
};

export type Company = {
  name: string;
  avatar: string;
};

export type Project = {
  id?: string;
  title: string;
  summary: string;
  detail: string;
  creator: string;
  deadline?: Date;
  teamSize: number;
  cratedAt?: Date;
};

export type ScoresType = {
  professionalism: number;
  initiative: number;
  leadership: number;
  "problem-solving": number;
  teamwork: number;
};
