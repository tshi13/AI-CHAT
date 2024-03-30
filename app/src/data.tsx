import { Company, Project } from "./lib/types";

export const pages = ["Home", "Problems", "Chat"];

export const appName = "Rising Star";

export const company: Company = {
  name: "React",
  avatar: "https://avatars.githubusercontent.com/u/70663623?v=4",
};

export const post: Project = {
  id: "fake_project_id",
  title: "Software Decomposer Project",
  description:
    "Collaborate with a team of students to hack a software and destroy it completely, leaving only a blank page. Do not do this at home",
  public: true,
  company,
  deadline: "4/1/2024",
  maxMember: 4,
  cratedAt: "3/23/2024",
};

const project1 = {
  ...post,
  company: {
    avatar:
      "https://images.crowdspring.com/blog/wp-content/uploads/2023/12/09194155/mcdonalds-logo.png",
    name: "Burger King",
  },
  current: false,
  visible: true,
};

const project2 = {
  ...post,
  company: {
    avatar:
      "https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg",
    name: "IBM",
  },
  current: false,
  visible: true,
};

const project3 = {
  ...post,
  company: {
    avatar:
      "https://1000logos.net/wp-content/uploads/2022/02/Syracuse-Orange-Logo-2006.png",
    name: "Syracuse University",
  },
  current: false,
  visible: true,
};

export const user = {
  id: "YunZng",
  name: "Yulun Zeng",
  avatar: "https://avatars.githubusercontent.com/u/70663623?v=4",
  education: "Johns Hopkins University",
  skills: {
    "professionalism": 50,
		"initiative": 50,
		"leadership": 50, 
		"problem-solving": 50,
		"teamwork": 50
  },
  bio: "Hi, I am Yulun. I am a junior student at Johns Hopkins University. I major in Computer Science and minor in Applied Math, and Entrepreneurship & Management. I enjoy learning about the application of chemistry and biology in the field of engineering. I wish to further pursue my career as a software developer. I would love to connect with like-minded students and professionals. Contact me via Linkedin, and let's chat!",
  projects: [project1, project2, project3, project2],
};
