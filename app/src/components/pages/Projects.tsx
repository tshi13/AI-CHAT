import ProjectAside from "../features/projects/ProjectAside";
import Profile from "./Profile";

function Projects() {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      <ProjectAside/>
      <div className="col-span-4 border">
      </div>
    </div>
  );
}
export default Projects;
