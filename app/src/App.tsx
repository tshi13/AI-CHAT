import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Chatbox from "./components/pages/Chat";
import Profile from "./components/pages/Profile";
import AppBar from "./components/features/common/AppBar";
import ErrorPage from "./components/features/common/ErrorPage";
import Login from "./components/auth/Login";
import { Toaster } from "@/components/ui/toaster";
import Register from "./components/auth/Register";
import { useStore } from "./lib/store";
import { useEffect, useState } from "react";
import { ScoreData, ScoresType } from "./types";
import RouteListener from "./components/features/common/RouteListener";
import Projects from "./components/pages/Projects";

function App() {
  const user = useStore((state) => state.user);

	const [scores, setScores] = useState<ScoresType>({
    "professionalism": 50,
		"initiative": 50,
		"leadership": 50, 
		"problemSolving": 50,
		"teamwork": 50
  });

	const initialScores: ScoreData[] = [
		{
			sequenceNumber: 1,
			professionalism: 50,
			initiative: 50,
			leadership: 50,
			problemSolving: 50,
			teamwork: 50,
		},
	];
	const [lineScores, setLineScores] = useState<ScoreData[]>(initialScores);
	useEffect(() => {
    setLineScores((currentScores) => {
        const newSequenceNumber = currentScores.length > 0 ? currentScores[currentScores.length - 1].sequenceNumber + 1 : 1;

        // Ensure the scores prop matches the structure expected by ScoreData
        const newScore: ScoreData = {
            sequenceNumber: newSequenceNumber,
            professionalism: scores.professionalism,
            initiative: scores.initiative,
            leadership: scores.leadership,
            problemSolving: scores.problemSolving,
            teamwork: scores.teamwork,
        };

        // Add the new score and keep the most recent 15 entries
        const updatedScores = [...currentScores, newScore].slice(-15);
				// console.log(updatedScores);
        return updatedScores;
    });
}, [scores]);


  return (
    <BrowserRouter basename="/AI-CHAT">
      <RouteListener />
      <AppBar />
      <Toaster />
      {user ? (
        <div className="content">
          <Routes>
            <Route path="/" element={<Profile lineScores={lineScores} scores={scores}/>} />
            <Route path="/home" element={<Profile lineScores={lineScores} scores={scores}/>} />
            <Route
              path="/chat"
              element={
                <Chatbox
                  user={{ id: "65f1a50e075c37359e2fdcef", name: "Yulun" }}
                  group={{
                    id: "65f19f411286acb83d05d2a0",
                    name: "Rising Start Testing",
                  }}
                  setScores={setScores}
                />
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/profile/:id" element={<Profile lineScores={lineScores} scores={scores} fromStudent={true}/>} />
          </Routes>
        </div>
      ) : (
        <div className="content">
          <div className="h-full items-center grid grid-cols-2 ">
            <Login />
            <Register />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
