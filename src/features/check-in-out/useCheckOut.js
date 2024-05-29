import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOutMutate, isLoading: isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Checked-out ${data.id} sucessfully`);
      queryClient.invalidateQueries({ queryKey: ["bookings"], data });
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkOutMutate, isCheckOut };
}
