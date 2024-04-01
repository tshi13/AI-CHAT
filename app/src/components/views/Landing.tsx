// import TableComponent from './TableComponent';
// import CustomQueryInput from './CustomQueryInput';
// import PresetQuerySelector from './PresetQuerySelector';
import Chatbox from "../pages/ChatBox";

function Landing() {
  //   const [query, setQuery] = useState('');
  //   const [isCustomQuery, setIsCustomQuery] = useState(true);
  // 	const [curruser, setUser] = useState({});
  // 	const [message, setMessage] = useState('');

  // const handleQuerySubmit = (newQuery:string) => {
  //   setQuery(newQuery);
  // };

  // const toggleQueryType = (event:any) => {
  //   setIsCustomQuery(event.target.checked);
  // };

  return (
    <div>
      <Chatbox
      />
      {/* <TableComponent query={query} /> */}
    </div>
  );
}

export default Landing;
