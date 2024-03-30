// import { useState } from 'react';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbox from "./components/pages/ChatBox";
import Problems from "./components/pages/Problems";
import Profile from "./components/pages/Profile";
import AppBar from "./components/views/AppBar";
import ErrorPage from "./components/views/ErrorPage";
import { ScoresType } from "./types";
import login from "./components/auth/Login";

function App() {
  // const [query, setQuery] = useState('');
  // const [isCustomQuery, setIsCustomQuery] = useState(true);

  // const handleQuerySubmit = (newQuery) => {
  //   setQuery(newQuery);
  // };

  // const toggleQueryType = (event) => {
  //   setIsCustomQuery(event.target.checked);
  // };

  // State that you want to share between Profile and Landing
  const [scores, setScores] = useState<ScoresType>({
    professionalism: 50,
    initiative: 50,
    leadership: 50,
    "problem-solving": 50,
    teamwork: 50,
  });
  const appContent = (
    <div className="content">
      <Routes>
        <Route path="/" element={<Profile scores={scores} />} />
        <Route path="/home" element={<Profile scores={scores} />} />
        <Route
          path="/chat"
          element={
            <Chatbox
              user={{ id: "65f1a50e075c37359e2fdcef", name: "Yulun" }}
              group={{
                id: "65f19f411286acb83d05d2a0",
                name: "Rising Start Testing",
              }}
              scores={scores}
              setScores={setScores}
            />
          }
        />
        <Route path="/problems" element={<Problems />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
  const user = null;
  return (
    <BrowserRouter basename="/AI-CHAT">
      <AppBar />
      {user ? appContent : <login>}
    </BrowserRouter>
  );
}

export default App;

// return (
//   <div>
//     <Landing />
//     {/* <Chatbox userID="63716c0a1e71f4f594736570" username="Taiming" groupID="65f19f411286acb83d05d2a0" groupName="Rising Start Testing" newHeight="500" /> */}
//   </div>
// );
