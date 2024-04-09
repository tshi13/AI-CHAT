import { createProject, getProject } from "@/api/project";
import { useToast } from "@/components/ui/use-toast";
import { Project, ProjectQuery } from "@/lib/types";

export default function useEditProject() {
  const { toast } = useToast();

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
      return await getProject(query);
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
  return { handleProjectCreate, handleProjectGet };
}
