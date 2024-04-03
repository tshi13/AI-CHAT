import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useStore } from "@/lib/store";
import { Role } from "@/lib/types";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import ProjectFilters from "./ProjectFilters";
import { ProjectCreate } from "./ProjectCreate";

export default function ProjectAside() {
  return (
    <div className="flex flex-col gap-4 sticky top-4 h-min">
      <ProjectFilters />
      <ProjectCreate/>
    </div>
  );
}
