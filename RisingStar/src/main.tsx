import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/views/ErrorPage.tsx";
import Home from "./components/pages/Home.tsx";
import App from "./App.tsx";
import AppBar from "./components/views/AppBar.tsx";
import Profile from "./components/pages/Profile.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home/>} errorElement={<ErrorPage/>}/>
        <Route path="/home" element={<Home/>} errorElement={<ErrorPage/>}/>
        <Route path="/profile" element={<Profile/>} errorElement={<ErrorPage/>}/>
        <Route path="/chat" element={<App/>} errorElement={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
