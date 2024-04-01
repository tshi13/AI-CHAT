import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useStatusUser from "@/hooks/use-status-user";
import { useToast } from "../ui/use-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useStatusUser();
  const { toast } = useToast();
  const handleClick = async (username: string, password: string) => {
    if (!username || !password) {
      toast({
        title: "Opps!",
        description: "You need to enter both username and password!",
        variant: "destructive",
      });
    } else {
      handleLogin(username, password);
    }
  };
  return (
    <div className="flex justify-center h-72 items-center border-r">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="pwd">Password</Label>
        <Input
          type="password"
          id="pwd"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="mt-4"
          onClick={() => handleClick(username, password)}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
