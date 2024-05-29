import { useQuery } from "@tanstack/react-query";
import { useCurrentAuth } from "../../services/apiAuth";

export function useUser() {
  const { data: isAuthUserCheck, isLoading: isAuthUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: useCurrentAuth,
  });

  return {
    isAuthUserCheck,
    isAuthUserLoading,
    isUserAuth: isAuthUserCheck?.role === "authenticated",
  };
}
