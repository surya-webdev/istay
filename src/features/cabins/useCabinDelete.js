import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/cabinApi";
import toast from "react-hot-toast";

export function useCabinDelete() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: deleting } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted sucesfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleting, mutate };
}
