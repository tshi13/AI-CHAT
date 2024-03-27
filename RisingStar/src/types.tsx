export type User = {
  id: string;
  name: string;
};

export type Group = {
  id: string;
  name: string;
};

export type Company ={
  name: string;
  avatar: string;
}

export type Project = {
  id: string;
  title: string;
  description: string;
  public: boolean;
  company: Company;
  deadline: string;
  maxMember: number;
  cratedAt: string;
}