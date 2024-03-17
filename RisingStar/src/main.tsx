import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/view/ErrorPage.tsx";
import Home from "./components/view/Home.tsx";
import App from "./App.tsx";
import Header from "./components/view/Header.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:"home",
        element: <Home/>,
        errorElement: <ErrorPage/>
      },
      {
        path:"chat",
        element: <App/>,
        errorElement: <ErrorPage/>
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
