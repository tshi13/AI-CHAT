import ProjectFilters from "./ProjectFilters";
import ProjectCreate from "./ProjectCreate";

export default function ProjectAside() {
  return (
    <div className="flex flex-col gap-4 sticky top-4 h-min">
      <ProjectFilters />
      <ProjectCreate />
    </div>
  );
}
