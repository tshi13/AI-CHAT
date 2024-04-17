import { joinProject } from "@/api/project";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Role } from "@/lib/types";
import { Link } from "react-router-dom";

export default function ProjectActions() {
  const selectedProject = useStore((state) => state.selectedProject);
  const user = useStore((state) => state.user!);
  return (
    <div className="flex items-center justify-end gap-4">
      {user?.role === Role.ORG ? (
        <>
          <Button
            variant="outline"
            className="w-44 border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className="w-44 border-red-500 text-red-500 hover:text-white hover:bg-red-500"
          >
            Delete
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            className="w-24 border-green-500 text-green-500 hover:text-white hover:bg-green-500"
            onClick={() => joinProject(user.id!, selectedProject!.id!)}
          >
            Join
          </Button>
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
