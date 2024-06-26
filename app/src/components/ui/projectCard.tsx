import { Card } from "./card";
import { Link } from "react-router-dom";

function ProjectCard({
  project,
  height,
  width,
  fontSizeTitle = "text-xl",
  fontSizeRest,
  lines = "line-clamp-3",
}: {
  project: any;
  height: string;
  width: string;
  fontSizeTitle?: string;
  fontSizeRest?: string;
  lines?: string;
}) {
  return (
    <Card className={`overflow-hidden ${height} flex`}>
      <img
        className={`${height} ${width} object-contain`}
        src={project.thumbnail}
      />
      <div className="relative p-1 w-full h-full">
        <h1 className={fontSizeTitle}>{project.title}</h1>
        <p className={`${fontSizeRest} font-light text-slate-500`}>
          {project.summary}
        </p>
        <p className={`${fontSizeRest} ${lines}`}>{project.description}</p>
        <Link to={`/projects`} className={`${fontSizeRest} absolute right-0 bottom-0 p-2 hover:underline`}>View details &rarr;</Link>
      </div>
    </Card>
  );
}
export default ProjectCard;
