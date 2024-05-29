import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_COUNT } from "../../utils/pageCount";

function useBookingApi() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("status");

  let filter =
    !filterValue || filterValue == "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // sort
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";

  let [field, direction] = sortByValue.split("-");
  let sortBy = { field, direction };
  // paginations
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // console.log(page);

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => addBooking(filter, sortBy, page),
  });
  const pageCount = Math.ceil(page / PAGE_COUNT);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => addBooking(filter, sortBy, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => addBooking(filter, sortBy, page - 1),
    });
  }

  return { bookings, count, error, isLoading };
}

export default useBookingApi;
