export const pages = ["Home", "Problem", "Chat"];

export const appName = ["Rising Star"];

export const company = {
  avatar: "https://avatars.githubusercontent.com/u/70663623?v=4",
  name: "React",
};

export const post = {
  title: "Mock Post Title",
  description:
    "Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description Mock Post Description",
  public: true,
  company,
  deadline: "4/1/2024",
  maxMember: 4,
  cratedAt: "3/23/2024",
};

const project1 = {
  ...post,
  current: false,
  visible: true,
};

const project2 = {
  ...post,
  current: false,
  visible: true,
};

const project3 = {
  ...post,
  current: false,
  visible: true,
};

export const user = {
  id: "YunZng",
  name: "Yulun Zeng",
  avatar: "https://avatars.githubusercontent.com/u/70663623?v=4",
  education: "Johns Hopkins University",
  skills: {
    "C++": 90,
    "Communication": 80,
    "Leadership": 70,
    "React.js": 50,
    "Response time": 100,
    "CSS": 13,
  },
  bio: "Hi, I am Yulun. I am a junior student at Johns Hopkins University. I major in Computer Science and minor in Applied Math, and Entrepreneurship & Management. I enjoy learning about the application of chemistry and biology in the field of engineering. I wish to further pursue my career as a software developer. I would love to connect with like-minded students and professionals. Contact me via Linkedin, and let's chat!",
  projects: [project1, project2, project3],
};
