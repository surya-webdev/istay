import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useUserLogout() {
  //
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutate, isLoading } = useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      navigate("login", { replace: true });
    },
  });
  return { logoutMutate, isLoading };
  //
}
