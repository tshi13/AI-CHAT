import { Link, Outlet } from "react-router-dom";
import { pages, user } from "../../data";
import SwitchAccessShortcutRoundedIcon from "@mui/icons-material/SwitchAccessShortcutRounded";
import { Avatar } from "@mui/material";

function Header() {
  return (
    <div className="h-screen overflow-hidden">
      <nav className="flex text-xl bg-black text-white sticky top-0 appbar items-center pl-4">
        <SwitchAccessShortcutRoundedIcon fontSize="large" />
        <Link to="home" className="hover-underline font-bold pl-2">
          Rising Star
        </Link>

        <div className="absolute right-0 pr-8">
          <div className="flex gap-16 items-center">
            {pages.map((page) => (
              <Link to={page} key={page} className="hover-underline">
                {page}
              </Link>
            ))}
            <Avatar alt={user.name} src={user.avatar} />
          </div>
        </div>


      </nav>
      <div className="content overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
export default Header;
