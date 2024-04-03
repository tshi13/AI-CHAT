import { useStore } from "@/lib/store";
import { appName, pages } from "../../../data";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

function AppBar() {
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
        <button
          onClick={() => handleClick(pages[0])}
          className="hover-underline font-bold pl-2 text-2xl"
        >
          {appName}
        </button>

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
export default AppBar;
