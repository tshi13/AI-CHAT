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
import { useEffect, useState } from "react";
import { ScoreData } from "@/types";

interface ProfileProps {
  scores: { [key: string]: number };
	lineScores: ScoreData[];
}





function Profile({scores, lineScores}: ProfileProps) {
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
// 	const [lineScores, setLineScores] = useState<ScoreData[]>(initialScores);
// 	useEffect(() => {
//     setLineScores((currentScores) => {
//         const newSequenceNumber = currentScores.length > 0 ? currentScores[currentScores.length - 1].sequenceNumber + 1 : 1;

//         // Ensure the scores prop matches the structure expected by ScoreData
//         const newScore: ScoreData = {
//             sequenceNumber: newSequenceNumber,
//             professionalism: scores.professionalism,
//             initiative: scores.initiative,
//             leadership: scores.leadership,
//             problemSolving: scores.problemSolving,
//             teamwork: scores.teamwork,
//         };

//         // Add the new score and keep the most recent 15 entries
//         const updatedScores = [...currentScores, newScore].slice(-15);
// 				// console.log(updatedScores);
//         return updatedScores;
//     });
// }, [scores]);
	
	const lineChartLabels = lineScores.map(score => `#${score.sequenceNumber}`);
  const datasets = Object.keys(scores).map(key => ({
    label: key,
    data: lineScores.map(score => score[key as keyof ScoreData]),
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
        title: {
          display: true,
          text: 'Score Sequence' // Meaningful name for the horizontal axis
        }
      },
      y: {
        beginAtZero: true,
        suggestedMax: 100, // Assuming scores are out of 100
      }
    },
  };





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