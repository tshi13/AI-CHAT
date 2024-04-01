import { Checkbox } from "@/components/ui/checkbox";

function Problems() {
  return (
    <div className="content">
      <div className="grid grid-cols-5 h-full gap-4 p-4">
        <div className="border gap-2 p-4">
          <Checkbox id="yours" />
          <label
            htmlFor="yours"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Your Projects
          </label>
        </div>
        <div className="col-span-4 border">what</div>
      </div>
    </div>
  );
}
export default Problems;
