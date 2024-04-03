import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Role } from "@/lib/types";
import useStatusUser from "@/hooks/use-status-user";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const { handleRegister } = useStatusUser();
  const { toast } = useToast();
  const clearFields = () => {
    setUsername("");
    setPassword("");
    (document.getElementById("rusername") as HTMLInputElement).value = "";
    (document.getElementById("rpassword") as HTMLInputElement).value = "";
  };
  const handleClick = async () => {
    console.log(username);
    console.log(password);
    if (!username || !password) {
      toast({
        title: "Opps!",
        description: "You need to enter both username and password!",
        variant: "destructive",
      });
    } else {
      handleRegister(username, password, role);
      clearFields();
    }
  };
  return (
    <div className="flex justify-center h-72 items-center border-l">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="rusername">Username</Label>
        <Input
          id="rusername"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="rpassword">Password</Label>
        <Input
          type="password"
          id="rpassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <RadioGroup
          className="flex justify-center p-4 "
          defaultValue={Role.STUDENT}
          onValueChange={(e) => setRole(e as Role)}
        >
          <Label htmlFor="student">Student</Label>
          <RadioGroupItem value={Role.STUDENT} id={Role.STUDENT} />
          <Label htmlFor="org">Organization</Label>
          <RadioGroupItem value={Role.ORG} id={Role.ORG} />
        </RadioGroup>
        <Button onClick={handleClick}>Register</Button>
      </div>
    </div>
  );
}

export default Register;
