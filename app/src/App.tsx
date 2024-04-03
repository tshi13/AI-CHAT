import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbox from "./components/pages/Chat";
import Projects from "./components/pages/Projects";
import Profile from "./components/pages/Profile";
import AppBar from "./components/features/common/AppBar";
import ErrorPage from "./components/features/common/ErrorPage";
import Login from "./components/auth/Login";
import { Toaster } from "@/components/ui/toaster";
import Register from "./components/auth/Register";
import { useStore } from "./lib/store";
import RouteListener from "./components/features/common/RouteListener";
import { useEffect } from "react";
import chatSetUp from "./lib/chat.init";

function App() {
  const user = useStore((state) => state.user);
  const { initChat } = chatSetUp();
  const setChatClient = useStore((state) => state.setChatClient);

  useEffect(() => {
    (async () => setChatClient(await initChat()))();
  }, []);

  return (
    <BrowserRouter basename="/AI-CHAT">
      <RouteListener />
      <AppBar />
      <Toaster />
      {user ? (
          <div className="content">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/home" element={<Profile />} />
              <Route path="/chat" element={<Chatbox />} />
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
