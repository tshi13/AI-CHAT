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
      }
    },
  };
  return (
    <div>
      <Radar data={chartData} options={options}/>
    </div>
  );
}
export default Profile;
