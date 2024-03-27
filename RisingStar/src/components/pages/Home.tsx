import { Button } from "../ui/button";
import { user } from "@/data";
import ProjectCard from "../ui/projectCard";

function Home() {
  return (
    <div className="content">
      
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-2">
        <Button variant={"link"}>Continue where you left off &rarr;</Button>
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {user.projects.slice(0,4).map((project) => (
            <ProjectCard project={project} height="h-28" width="w-28" fontSizeTitle="text-md" fontSizeRest="text-xs" lines="line-clamp-2"/>
          ))}
        </div>
      </div>
      <div className="col-span-2 border">
        
      </div>
    </div>
    </div>
  );
}
export default Home;
