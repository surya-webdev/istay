import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar }) =>
      updateCurrentUser({ fullName, avatar }),
    onSuccess: () => {
      toast.success("User account updated sucessfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUserMutate, isUpdating };
}
