import { useMutation } from "@tanstack/react-query";
import { newUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading: isSignUp } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      newUser({ fullName, email, password }),
    onSuccess: () =>
      toast.success(
        "your account created sucesfully please check your inbox confirm your email"
      ),
  });

  return { signUp, isSignUp };
}
