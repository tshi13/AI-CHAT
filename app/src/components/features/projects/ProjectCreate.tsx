import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { Project, Role } from "@/lib/types";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import useEditProject from "@/hooks/use-edit-projects";

export default function ProjectCreate() {
  const user = useStore((state) => state.user)!;
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<Project>({
    title: "",
    summary: "",
    detail: "",
    userId: user.id!,
    deadline: undefined,
    teamSize: 1,
  });
  const { handleProjectCreate } = useEditProject();
  const handleCreate = async () => {
    if (
      !(project.title && project.summary && project.detail && project.deadline)
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot have empty fields.",
      });
    } else {
      await handleProjectCreate(project);
      setOpen(false);
      setProject({
        title: "",
        summary: "",
        detail: "",
        userId: user.id!,
        deadline: undefined,
        teamSize: 1,
      });
    }
  };
  return user.role == Role.ORG ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create and publish your custom project!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Project title"
              className="col-span-5"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="summary" className="text-right">
              Summary
            </Label>
            <Input
              id="summary"
              placeholder="Brief summary of your project"
              className="col-span-5"
              value={project.summary}
              onChange={(e) =>
                setProject({ ...project, summary: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              Deadline
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  id="deadline"
                  className="col-span-2"
                >
                  {project.deadline ? (
                    <span className="text-sm font-normal">
                      {project.deadline.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  ) : (
                    <span className="text-zinc-500 text-sm font-normal">
                      Pick a date
                    </span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  disabled={(date) => date < new Date()}
                  selected={project.deadline}
                  onSelect={(deadline) => {
                    setProject({ ...project, deadline });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Label htmlFor="teamsize" className="text-right">
              Team Size
            </Label>
            <Input
              id="teamsize"
              type="number"
              defaultValue={project.teamSize}
              min={1}
              onChange={(e) => {
                setProject({ ...project, teamSize: parseInt(e.target.value) });
                console.log(project);
              }}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-6 gap-4">
            <Label htmlFor="detail" className="text-right pt-2">
              Detail
            </Label>
            <Textarea
              id="detail"
              className="col-span-5"
              placeholder="Specify the detail of your project"
              value={project.detail}
              onChange={(e) =>
                setProject({ ...project, detail: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} className="w-[135px]">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null;
}
