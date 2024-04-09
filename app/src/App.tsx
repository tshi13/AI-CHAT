import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Chatbox from "./components/pages/ChatBox";
import Profile from "./components/pages/Profile";
import AppBar from "./components/features/common/AppBar";
import ErrorPage from "./components/features/common/ErrorPage";
import Login from "./components/auth/Login";
import { Toaster } from "@/components/ui/toaster";
import Register from "./components/auth/Register";
import { useStore } from "./lib/store";
import { useState } from "react";
import { ScoresType } from "./types";
import RouteListener from "./components/features/common/RouteListener";
import Projects from "./components/pages/Projects";

function App() {
  const user = useStore((state) => state.user);

  const [scores, setScores] = useState<ScoresType>({
    professionalism: 50,
    initiative: 40,
    leadership: 20,
    "problem-solving": 10,
    teamwork: 50,
  });

  return (
    <BrowserRouter basename="/AI-CHAT">
      <RouteListener />
      <AppBar />
      <Toaster />
      {user ? (
        <div className="content">
          <Routes>
            <Route path="/" element={<Profile/>} />
            <Route path="/home" element={<Profile />} />
            <Route
              path="/chat"
              element={
                <Chatbox
                  user={{ id: "65f1a50e075c37359e2fdcef", name: "Yulun" }}
                  group={{
                    id: "65f19f411286acb83d05d2a0",
                    name: "Rising Start Testing",
                  }}
                  newHeight={800}
                  scores={scores}
                  setScores={setScores}
                />
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<ErrorPage />} />
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
