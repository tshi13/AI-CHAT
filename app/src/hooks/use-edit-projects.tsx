import { createProject, getProject } from "@/api/project";
import { getProjectById } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import { Project, ProjectQuery } from "@/lib/types";

export default function useEditProject() {
  const { toast } = useToast();
  const setDisplayProjects = useStore((state) => state.setDisplayProjects);
  const setSelectedProject = useStore((state) => state.setSelectedProject);

  const handleProjectCreate = async (project: Project) => {
    try {
      const response = await createProject(project);
      toast({
        variant: "success",
        title: "Success",
        description: "Project created.",
      });
      return response;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description:
          (err as Error).message ||
          "There was an error creating project. Please try again later.",
      });
    }
  };
  const handleProjectGet = async (query: ProjectQuery) => {
    try {
      const projects = await getProject(query);
      setDisplayProjects(projects);
      setSelectedProject(projects[0]);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to fetch project",
        description:
          (err as Error).message ||
          "There was an error fetching project. Please try again later.",
      });
    }
  };

  const handleProjectGetById = async (id: number): Promise<void> => {
    try {
      const projects = await getProjectById(id);
      setDisplayProjects(projects);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to fetch project",
        description:
          (err as Error).message ||
          "There was an error fetching project. Please try again later.",
      });
    }
  };

  return { handleProjectCreate, handleProjectGet, handleProjectGetById };
}
