import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Role } from "@/lib/types";
import { register } from "@/api/auth";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(Role.STUDENT);
  const { toast } = useToast();
  const handleRegister = async () => {
    if (!username || !password) {
      toast({
        title: "Opps!",
        description: "You need to enter both username and password!",
        variant: "destructive",
      });
    } else {
      await register(username, password, role);
    }
  };
  return (
    <div className="flex justify-center border-l">
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
          className="flex justify-center"
          defaultValue={Role.STUDENT}
          onValueChange={(e) => setRole(e as Role)}
        >
          <Label htmlFor="student">Student</Label>
          <RadioGroupItem value={Role.STUDENT} id={Role.STUDENT} />
          <Label htmlFor="org">Organization</Label>
          <RadioGroupItem value={Role.ORG} id={Role.ORG} />
        </RadioGroup>
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </div>
  );
}

export default Register;
