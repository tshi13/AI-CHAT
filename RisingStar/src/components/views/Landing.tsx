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
        user={{ id: "65f1a50e075c37359e2fdcef", name: "Yulun" }}
        group={{ id: "65f19f411286acb83d05d2a0", name: "Rising Start Testing" }}
        newHeight={800}
      />
      {/* <TableComponent query={query} /> */}
    </div>
  );
}

export default Landing;
