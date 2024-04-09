import { Radar, Line } from "react-chartjs-2";

import "chartjs-adapter-date-fns";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
	ChartOptions,
	Title,
	CategoryScale,
  LinearScale,
  TimeScale,

} from "chart.js";
import { user } from "../../data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import ProjectCard from "../ui/projectCard";
import { useState } from "react";

interface ProfileProps {
  scores: { [key: string]: number };
}

interface ScoreData {
  date: string;
  professionalism: number;
  initiative: number;
  leadership: number;
  problemSolving: number;
  teamwork: number;
}

const initialScores: ScoreData[] = [
  {
    date: "2023-04-02",
    professionalism: 50,
    initiative: 60,
    leadership: 40,
    problemSolving: 70,
    teamwork: 80,
  },
  {
    date: "2023-04-01",
    professionalism: 55,
    initiative: 65,
    leadership: 45,
    problemSolving: 75,
    teamwork: 85,
  },
  {
    date: "2023-03-28",
    professionalism: 62,
    initiative: 58,
    leadership: 52,
    problemSolving: 68,
    teamwork: 78,
  },
  {
    date: "2023-03-25",
    professionalism: 48,
    initiative: 72,
    leadership: 56,
    problemSolving: 62,
    teamwork: 82,
  },
  {
    date: "2023-03-22",
    professionalism: 58,
    initiative: 67,
    leadership: 50,
    problemSolving: 72,
    teamwork: 75,
  },
  {
    date: "2023-03-19",
    professionalism: 53,
    initiative: 63,
    leadership: 48,
    problemSolving: 65,
    teamwork: 88,
  },
  {
    date: "2023-03-16",
    professionalism: 2,
    initiative: 5,
    leadership: 20,
    problemSolving: 40,
    teamwork: 32,
  },
];


function Profile({scores}: ProfileProps) {
  // Chart config
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );


	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend,
		TimeScale
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


	// KEVINS GRAPH HERE
	const [lineScores, setLineScores] = useState<ScoreData[]>(initialScores);
	const lineChartLabels = lineScores.map((data) => data.date);
  const datasets = Object.keys(lineScores[0])
    .filter((key) => key !== "date")
    .map((key) => ({
      label: key,
      data: lineScores.map((data) => data[key as keyof ScoreData]),
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
      tension: 0.1,
    }));

  const lineChartData = {
		labels: lineChartLabels,
		datasets: datasets,
  };

  const lineChartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  } as ChartOptions<"line">;





	return (
		<div className="grid grid-cols-3 gap-4 p-4">
			<Card className="flex flex-col justify-center items-center p-10">
				<Avatar className="h-48 w-48 m-4">
					<AvatarImage src={user.avatar} />
					<AvatarFallback>?</AvatarFallback>
				</Avatar>
				<h1 className="text-2xl">{user.name}</h1>
				<p>{user.education}</p>
			</Card>
			<Card className="p-10">
				<h1 className="text-2xl">About me</h1>
				<div className="overflow-y-auto h-64">
					<p>{user.bio}</p>
				</div>
			</Card>
			<Card className="p-10">
				<Radar data={chartData} options={options} />
			</Card>
			<Card className="col-span-2 p-10">
			<div className="w-full h-full"> {/* Adjust width and height as needed */}
				<Line data={lineChartData} options={lineChartOptions} />
			</div>
			</Card>
			<Card className="col-span-1 p-10 flex flex-col justify-center">
				<h1 className="text-2xl">Metrics Summary</h1>
				<div className="overflow-y-auto h-64">
					<p>Some more data we want to add in the future</p>
				</div>
			</Card>
			<div className="col-span-3">
				<h1 className="text-2xl">Projects</h1>
				<div className="grid grid-cols-2 gap-4 pt-8">
					{user.projects.map((project) => (
						<ProjectCard project={project} height="h-44" width="w-44" />
					))}
				</div>
			</div>
		</div>
	);
	
}
export default Profile;