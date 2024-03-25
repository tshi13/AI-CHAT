export const pages = ["Home", "Problem", "Chat"];

export const appName = ["Rising Star"];

export const company = {
  avatar: "../src/assets/react.svg",
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

const project1={
  ...post,
  current: false,
  visible: true,
}

const project2={
  ...post,
  current: false,
  visible: true,
}

const project3={
  ...post,
  current: false,
  visible: true,
}

export const user = {
  id: 'YunZng',
  name: "Yulun Zeng",
  avatar: "../src/assets/react.svg",
  skills: {
    'C++': 90,
    'Java': 80,
    'Python': 70,
    'React.js': 50,
    'Fuck it': 100,
    'Diu lay low mou': 13
  },
  bio: '',
  projects: [project1, project2, project3],
};