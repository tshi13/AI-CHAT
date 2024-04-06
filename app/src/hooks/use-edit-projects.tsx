import { login, register } from "@/api/auth";
import { createProject } from "@/api/project";
import { useToast } from "@/components/ui/use-toast";
import { deleteToken, getUserFromToken } from "@/lib/jwt-decoder";
import { useStore } from "@/lib/store";
import { Role } from "@/lib/types";
import { Project } from "@/types";
import { useEffect } from "react";

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
      console.log(err);
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description:
          (err as Error).message ||
          "There was an error signing in. Please try again later.",
      });
    }
  };

  return {handleProjectCreate};
}
