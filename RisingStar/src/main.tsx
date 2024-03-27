import React , { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/views/ErrorPage.tsx";
import AppBar from "./components/views/AppBar.tsx";
import Profile from "./components/pages/Profile.tsx";
import Problems from "./components/pages/Problems.tsx";
import Landing from "./components/views/Landing.tsx";
import Chatbox from "./components/pages/ChatBox.tsx";
import { ScoresType } from "./types.tsx";

function RootComponent() {
  // State that you want to share between Profile and Landing
  const [scores, setScores] = useState<ScoresType>({
    "professionalism": 50,
		"initiative": 50,
		"leadership": 50, 
		"problem-solving": 50,
		"teamwork": 50
  });

  return (
    <BrowserRouter basename="/AI-CHAT">
      <AppBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Profile scores={scores} />} />
          <Route path="/home" element={<Profile scores={scores} />} />
          <Route path="/chat" element={ <Chatbox
        user={{ id: "65f1a50e075c37359e2fdcef", name: "Yulun" }}
        group={{ id: "65f19f411286acb83d05d2a0", name: "Rising Start Testing" }}
        newHeight={800}
				scores={scores}
				setScores={setScores}
      />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
