import {
  createProject,
  getProject,
  joinProject,
  leaveProject,
} from "@/api/project";
import { getProjectByUserId } from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import { Project, ProjectQuery } from "@/lib/types";

export default function useEditProject() {
  const { toast } = useToast();
  const setDisplayProjects = useStore((state) => state.setDisplayProjects);
  const setSelectedProject = useStore((state) => state.setSelectedProject);
  const setUserProjects = useStore((state) => state.setUserProjects);
  const addUserProject = useStore((state) => state.addUserProject);
  const removeUserProject = useStore((state) => state.removeUserProject);

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

  const handleProjectGetByUserId = async (id: number): Promise<void> => {
    try {
      const projects = await getProjectByUserId(id);
      setUserProjects(projects);
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

  const handleProjectJoin = async (
    userId: number,
    projectId: string
  ): Promise<void> => {
    try {
      const project = await joinProject(userId, projectId);
      addUserProject(project);
      toast({
        variant: "success",
        title: "Success",
        description: "You joined this project.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to join project",
        description:
          (err as Error).message ||
          "There was an error joining the project. Please try again later.",
      });
    }
  };

  const handleProjectLeave = async (
    userId: number,
    projectId: string
  ): Promise<void> => {
    try {
      const project = await leaveProject(userId, projectId);
      removeUserProject(project);
      toast({
        variant: "success",
        title: "Success",
        description: "You left this project.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to leave project",
        description:
          (err as Error).message ||
          "There was an error leaving the project. Please try again later.",
      });
    }
  };
  
  return {
    handleProjectCreate,
    handleProjectGet,
    handleProjectGetByUserId,
    handleProjectJoin,
    handleProjectLeave,
  };
}
