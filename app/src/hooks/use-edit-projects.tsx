import { createProject } from "@/api/project";
import { useToast } from "@/components/ui/use-toast";
import { Project } from "@/lib/types";

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

  return {handleProjectCreate};
}
