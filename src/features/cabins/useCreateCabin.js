import toast from "react-hot-toast";
import { addCabin } from "../../services/cabinApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (data) => addCabin(data),
    onSuccess: () => {
      toast.success("cabin added sucessfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isCreating };
}
