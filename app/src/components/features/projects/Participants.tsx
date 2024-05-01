import { getParticipants } from "@/api/project";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { participants } from "@/data";
import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";

export default function Participants() {
  const selectedProject = useStore((state) => state.selectedProject);
  // const handleGetParticipants = async () => {
  //   // const participants = await getParticipants(selectedProject!.id!);
  // }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-44 border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500"
          // onClick={handleGetParticipants}
        >
          Participants
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Participants</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 max-h-[400px]">
          {
            participants.map((participant) => (
              <Link key={participant.id} to={`/profile/${participant.id}`}>
              <div className="flex items-center gap-4 pb-2">
                <img
                  src={participant.avatar}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{participant.name}</p>
                </div>
              </div>
              <Separator/>
              </Link>
            ))
          }
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
