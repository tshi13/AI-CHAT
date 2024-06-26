import { useStore } from "@/lib/store";
import { appName, pages } from "../../../data";
import { Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import useStatusUser from "@/hooks/use-status-user";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AppBar() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const { handleLogout } = useStatusUser();

  const handleClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="sticky top-0">
      <nav className="flex text-xl bg-black text-white appbar items-center pl-4">
        <Sparkles />
        <Link to="http://localhost:5173/AI-CHAT/profile/2">
          <button
            onClick={() => handleClick(pages[0])}
            className="hover-underline font-bold pl-2 text-2xl"
          >
            {appName}
          </button>
        </Link>
        <div className="absolute right-0 pr-8">
          <div className="flex gap-16 items-center">
            {pages.map((page) => (
              <button
                onClick={() => handleClick(page.toLowerCase())}
                key={page}
                className="hover-underline"
              >
                {page}
              </button>
            ))}
            {user ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Logout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive" onClick={handleLogout}>
                      Logout
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}
