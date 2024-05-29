import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import useBookingApi from "./useBookingApi";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  // const bookings = [];

  const { bookings, isLoading, count } = useBookingApi();

  if (isLoading) return <Spinner />;

  if (bookings === undefined) return <Spinner />;
  if (!bookings.length) return <Empty resource="Bookings" />;

  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
      <Table.Footers>
        <Pagination count={count} />
      </Table.Footers>
    </Table>
  );
}

export default BookingTable;
