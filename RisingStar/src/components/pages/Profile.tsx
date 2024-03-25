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

function Profile() {
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
    <div className="grid grid-cols-4 gap-4">
      <div className="border border-black flex flex-col justify-center items-center p-10 gap-4">
        <Avatar className="h-48 w-48">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl">{user.name}</h1>
      </div>
      <div className="border border-black col-span-2"></div>
      <div className="border border-black">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
}
export default Profile;
