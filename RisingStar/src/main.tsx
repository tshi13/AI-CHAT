import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/views/ErrorPage.tsx";
import App from "./App.tsx";
import AppBar from "./components/views/AppBar.tsx";
import Profile from "./components/pages/Profile.tsx";
import Problems from "./components/pages/Problems.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/AI-CHAT">
      <AppBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/home" element={<Profile />} />
          <Route path="/chat" element={<App />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
