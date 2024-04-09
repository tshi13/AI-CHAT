import { useEffect, useState } from "react";
import ProjectAside from "../features/projects/ProjectAside";
import useEditProject from "@/hooks/use-edit-projects";
import { Project, ProjectQuery } from "@/lib/types";
import { Card } from "../ui/card";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState<ProjectQuery>({
    offset: 0,
    limit: 25,
    order: "ASC",
  });
  const { handleProjectGet } = useEditProject();
  const loadProjects = async () => {
    const response = await handleProjectGet(query);
    await setProjects(response);
  };
  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <ProjectAside />
      <div className="col-span-5">
        <div className="overflow-hidden overflow-y-auto w-96 h-[88vh] fancyScrollBar">
          <div className="flex flex-col gap-2 ">
            {projects.map((project) => (
              <Card key={project.id} className="h-36 flex p-4">
                <img className="size-28" src={project.thumbnail} />
                <div>
                  <h1 className="font-medium">{project.title}</h1>
                  <h1 className="font-light">{project.summary}</h1>
                  <p className="font-light">{project.detail}</p>
                  <p className="">Deadline: {new Date(project.deadline!).toLocaleDateString()}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
