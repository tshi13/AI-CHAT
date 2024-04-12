import { useEffect, useState } from "react";
import ProjectAside from "../features/projects/ProjectAside";
import useEditProject from "@/hooks/use-edit-projects";
import { Project, ProjectQuery } from "@/lib/types";
import { Card } from "../ui/card";
import { CalendarClockIcon, UsersRoundIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [query] = useState<ProjectQuery>({
    offset: 0,
    limit: 25,
    order: "ASC",
  });
  const { handleProjectGet } = useEditProject();
  const loadProjects = async () => {
    const response = await handleProjectGet(query);
    await setProjects(response);
    await setSelectedProject(response[0]);
  };
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <ProjectAside />
      <div className="col-span-5 grid grid-cols-7 gap-4 flex">
        <div className="col-span-2 overflow-hidden overflow-y-auto h-[88vh] fancyScrollBar">
          <div className="flex flex-col gap-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="h-36 clickable border shadow border-box"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex w-full h-full gap-2 p-2 rounded-[10px]">
                  <img className="size-32" src={project.thumbnail} />
                  <div className="h-full relative">
                    <p className="font-medium">{project.title}</p>
                    <p className="font-light">{project.summary}</p>
                    <span className="flex items-center text-sm font-light gap-8 absolute bottom-0">
                      <span className="flex gap-2">
                        <CalendarClockIcon className="size-4" />
                        {new Date(project.deadline!).toLocaleDateString()}
                      </span>
                      <span className="flex gap-2">
                        <UsersRoundIcon className="size-4" />
                        {project.teamSize}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Card className="col-span-5 w-full flex p-4 overflow-hidden overflow-y-auto h-[88vh] fancyScrollBar">
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2">
              <div className="flex items-center">
                <img className="w-24" src={selectedProject?.thumbnail} />
                <h1>{selectedProject?.title}</h1>
              </div>
              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  className="w-44 bg-sky-500 text-white"
                >
                  <Link to={"/chat"}>Contact Organization</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-24 bg-green-500 text-white"
                >
                  <Link to={"/chat"}>Join</Link>
                </Button>
              </div>
            </div>
            <Separator />
            <h2>Summary</h2>
            <p className="font-light">{selectedProject?.summary}</p>
            <h3 className="font-bold text-xl">Detail</h3>
            <ReactMarkdown>{selectedProject?.detail}</ReactMarkdown>
          </div>
        </Card>
      </div>
    </div>
  );
}
