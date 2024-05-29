import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

export function useBookingDelete() {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isLoading: isDeleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Deleted  sucessfully`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteMutate, isDeleteBooking };
}
