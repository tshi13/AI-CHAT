import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <Button variant="outline">
        <Link to='/chat'>
          Chat
        </Link>
      </Button>
    </div>
  );
}
export default Home;
