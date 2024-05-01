import { deleteProject } from "@/api/project";
import { Button } from "@/components/ui/button";
import useEditProject from "@/hooks/use-edit-projects";
import { useStore } from "@/lib/store";
import { Role } from "@/lib/types";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Participants from "./Participants";

export default function ProjectActions() {
  const selectedProject = useStore((state) => state.selectedProject);
  const user = useStore((state) => state.user!);
  const userProjects = useStore((state) => state.userProjects);
  const { handleProjectJoin, handleProjectLeave, handleProjectGetByUserId } =
    useEditProject();

  useEffect(() => {
    handleProjectGetByUserId(user.id!);
  }, []);

  const joinProject = async (userId: number, projectId: string) => {
    await handleProjectJoin(userId, projectId);
    await handleProjectGetByUserId(userId);
  };

  const leaveProject = async (userId: number, projectId: string) => {
    await handleProjectLeave(userId, projectId);
    await handleProjectGetByUserId(userId);
  };

  return (
    <div className="flex items-center justify-end gap-4">
      {user?.role === Role.ORG ? (
        <>
          <Participants/>
          <Button
            variant="outline"
            className="w-44 border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className="w-44 border-red-500 text-red-500 hover:text-white hover:bg-red-500"
            onClick={() => deleteProject(selectedProject!.id!)}
          >
            Delete
          </Button>
        </>
      ) : (
        <>
          {userProjects.some((project) => project.id == selectedProject!.id) ? (
            <>
              <Link to={"/chat"}>
                <Button
                  variant="outline"
                  className="w-24 border-green-500 text-green-500 hover:text-white hover:bg-green-500"
                >
                  Work
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-24 border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                onClick={() => leaveProject(user.id!, selectedProject!.id!)}
              >
                Leave
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="w-24 border-green-500 text-green-500 hover:text-white hover:bg-green-500"
              onClick={() => joinProject(user.id!, selectedProject!.id!)}
            >
              Join
            </Button>
          )}

          <Link to={"/chat"}>
            <Button
              variant="outline"
              className="w-44 border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500"
            >
              Contact Organization
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
