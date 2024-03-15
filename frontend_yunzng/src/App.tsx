// import { useState } from 'react';
import Landing from "./Landing";
import Header from "./components/view/Header";

function App() {
  // const [query, setQuery] = useState('');
  // const [isCustomQuery, setIsCustomQuery] = useState(true);

  // const handleQuerySubmit = (newQuery) => {
  //   setQuery(newQuery);
  // };

  // const toggleQueryType = (event) => {
  //   setIsCustomQuery(event.target.checked);
  // };

  return (
    <div>
      <Header />
      <Landing />
      {/* <Chatbox userID="63716c0a1e71f4f594736570" username="Taiming" groupID="65f19f411286acb83d05d2a0" groupName="Rising Start Testing" newHeight="500" /> */}
    </div>
  );
}

export default App;
