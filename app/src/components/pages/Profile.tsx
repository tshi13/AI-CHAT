import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { user } from "../../data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import ProjectCard from "../ui/projectCard";

interface ProfileProps {
  scores: { [key: string]: number };
}

export default function Profile({ scores }: ProfileProps) {
  // Chart config
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  const chartData = {
    labels: Object.keys(user.skills),
    datasets: [
      {
        label: "Proficiency",
        data: Object.values(scores),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <Card className="flex flex-col justify-center items-center p-10">
        <Avatar className="h-48 w-48 m-4">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl">{user.name}</h1>
        <p>{user.education}</p>
      </Card>
      <Card className="col-span-2 p-10">
        <h1 className="text-2xl">About me</h1>
        <div className="overflow-y-auto h-64">
          <p>{user.bio}</p>
        </div>
      </Card>
      <Card className="border">
        <Radar data={chartData} options={options} />
      </Card>
      <div className="col-span-4">
        <h1 className="text-2xl">Projects</h1>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {user.projects.map((project) => (
            <ProjectCard project={project} height="h-44" width="w-44" />
          ))}
        </div>
      </div>
    </div>
  );
}
