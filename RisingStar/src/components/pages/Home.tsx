import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Home() {
  return (
    <>
      <Button variant="outline">
        <Link to='/chat'>
          Chat
        </Link>
      </Button>
    </>
  );
}
export default Home;
