// RouteChangeTracker.tsx
import { getToken, isTokenExpired, deleteToken } from "@/lib/jwt-decoder";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "../../ui/use-toast";
import { useStore } from "@/lib/store";

const RouteListener = () => {
  const location = useLocation();
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();
  useEffect(() => {
    const token = getToken();
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        deleteToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, [location]);
  return null;
};

export default RouteListener;
