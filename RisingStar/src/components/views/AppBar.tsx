import { Link } from "react-router-dom";
import { appName, pages, user } from "../../data";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Sparkles } from "lucide-react"

function AppBar() {
  return (
    <div className="sticky top-0">
      <nav className="flex text-xl bg-black text-white appbar items-center pl-4">
        <Sparkles />
        <Link to="home" className="hover-underline font-bold pl-2">
          {appName}
        </Link>

        <div className="absolute right-0 pr-8">
          <div className="flex gap-16 items-center">
            {pages.map((page) => (
              <Link
                to={page.toLowerCase()}
                key={page}
                className="hover-underline"
              >
                {page}
              </Link>
            ))}

            <Link to={"profile/" + user.id} key={user.id}>
              <Avatar>
                <AvatarImage src={user.avatar} />
              </Avatar>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default AppBar;
