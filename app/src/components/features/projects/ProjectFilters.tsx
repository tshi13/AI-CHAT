import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ProjectFilters() {
  return (
    <Card className="flex flex-col gap-2 p-4">
      <h3>Filter</h3>
      <div className="flex items-center gap-2">
        <Checkbox id="yours" />
        <Label htmlFor="yours" className="text-sm">
          Your Projects
        </Label>
      </div>

      <h3>Sort by</h3>
      <div className="flex items-center gap-2">
        <RadioGroup defaultValue="mostRecent">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="mostRecent" id="mostRecent" />
            <Label htmlFor="mostRecent" className="text-sm">
              Most recent
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="popularity" id="popularity" />
            <Label htmlFor="popularity" className="text-sm">
              Popularity
            </Label>
          </div>
        </RadioGroup>
      </div>
    </Card>
  );
}
