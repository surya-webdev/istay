import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/cabinApi";
import toast from "react-hot-toast";

export function useEditingCabin() {
  const queryClient = useQueryClient();
  const { mutate: editMutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => addCabin(newCabin, id),
    onSuccess: () => {
      toast.success("cabin edited sucessfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editMutate, isEditing };
}
