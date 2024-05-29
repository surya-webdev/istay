import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuth } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: isAuth, isLoading: isAuthLoading } = useMutation({
    mutationFn: ({ email, password }) => getAuth({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("Invalid user please enter the correct email");
    },
  });

  return {
    isAuth,
    isAuthLoading,
  };
}
