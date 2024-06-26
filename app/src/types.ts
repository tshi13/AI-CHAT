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


export type ScoresType = {
  professionalism: number;
  initiative: number;
  leadership: number;
  problemSolving: number;
  teamwork: number;
};

export type ScoreData = {
  sequenceNumber: number;
  professionalism: number;
  initiative: number;
  leadership: number;
  problemSolving: number;
  teamwork: number;
}
