import ExperienceCreate from "./ExperienceCreate";
import { experience } from "@/data";

export default function Experience() {
  return (
    <div className="col-span-full">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl">Experience</h1>
        <ExperienceCreate />
      </div>
      <div className="flex flex-col pt-8 gap-4">
        {experience.map((exp) => {
          return (
            <div key={exp.company} className="flex">
              <img src={exp.picture} className="size-20"/>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg">{exp.title}</h2>
                <p>{exp.company}</p>
                <p>{exp.date}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
