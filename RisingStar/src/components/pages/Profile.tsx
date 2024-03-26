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

function Profile() {
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
        data: Object.values(user.skills),
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
      <div className="border flex flex-col justify-center items-center p-10">
        <Avatar className="h-48 w-48 m-4">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl">{user.name}</h1>
        <p>{user.education}</p>
      </div>
      <div className="border col-span-2 pt-10">
        <h1 className="text-2xl">About me</h1>
        <p>{user.bio}</p>
      </div>
      <div className="border">
        <Radar data={chartData} options={options} />
      </div>
      <div className="border col-span-4">
        <h1 className="text-2xl">Projects</h1>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {user.projects.map((project) => (
            <Card className="overflow-hidden h-40 flex">
              <img className="w-40 h-40 object-contain" src={project.company.avatar} />
              <div className="p-1">
                <h1 className="text-lg">{project.title}</h1>
                <p className="font-light text-slate-500">{project.company.name}</p>
                <p className="line-clamp-3">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Profile;
