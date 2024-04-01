import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Chatbox from "./components/pages/ChatBox";
import Problems from "./components/pages/Problems";
import Profile from "./components/pages/Profile";
import AppBar from "./components/views/AppBar";
import ErrorPage from "./components/views/ErrorPage";
import Login from "./components/auth/Login";
import { Toaster } from "@/components/ui/toaster";
import Register from "./components/auth/Register";
import { useStore } from "./lib/store";
import RouteListener from "./components/views/RouteListener";

function App() {
  const user = useStore((state) => state.user);
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
            <Route path="/problems" element={<Problems />} />
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
