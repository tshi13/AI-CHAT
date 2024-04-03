import { login, register } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { deleteToken, getUserFromToken } from "@/lib/jwt-decoder";
import { useStore } from "@/lib/store";
import { Role } from "@/lib/types";
import { useEffect } from "react";

function useStatusUser() {
  const { toast } = useToast();
  const setUser = useStore((state) => state.setUser);
  const clearUser = useStore((state) => state.clearUser);
  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      setUser(user);
      toast({
        variant: "success",
        title: "Success",
        description: "You are logged in.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to login",
        description:
          (err as Error).message ||
          "There was an error signing in. Please try again later.",
      });
    }
  };
  const handleLogout = () => {
    deleteToken();
    clearUser();
    toast({
      variant: "success",
      title: "Success",
      description: "You have been logged out.",
    });
  };
  const handleRegister = async (
    username: string,
    password: string,
    role: Role
  ) => {
    try {
      await register(username, password, role);
      toast({
        variant: "success",
        title: "Success",
        description: "Account registered, you may now sign in.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to register",
        description:
          (err as Error).message ||
          "There was an error registering. Please try again later.",
      });
    }
  };
  useEffect(() => {
    try {
      const user = getUserFromToken();
      setUser(user!);
    } catch (error) {
      clearUser();
    }
  }, []);
  return { handleLogin, handleLogout ,handleRegister};
}
export default useStatusUser;
