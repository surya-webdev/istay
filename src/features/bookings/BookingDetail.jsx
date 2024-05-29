import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingId from "./useBookingId";
import Spinner from "../../ui/Spinner";
import { redirect, useNavigate, useNavigation } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useBookingDelete } from "./useBookingDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const booking = {};
  const { booking = {}, isLoading } = useBookingId();
  const navigate = useNavigate();
  const { checkOutMutate, isCheckOut } = useCheckOut();
  const moveBack = useMoveBack();
  const { deleteMutate, isDeleteBooking } = useBookingDelete();

  if (!booking.length) return <Empty resource="Bookings" />;

  const { id = "" } = booking;
  const { status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading || isCheckOut) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button
          variations="danger"
          sizes="large"
          onClick={() => {
            deleteMutate(id);
            navigate(`/`);
          }}
        >
          Delete
        </Button>

        {status === "checked-in" && (
          <Button
            variations="primary"
            sizes="large"
            onClick={() => checkOutMutate(id)}
          >
            Check out
          </Button>
        )}
        {status === "checked-out" && (
          <Button
            variations="primary"
            sizes="large"
            onClick={() => navigate(`/checking/${id}`)}
          >
            Check IN
          </Button>
        )}
        <Button variations="secondary" sizes="large" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
