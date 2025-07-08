import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingId from "../bookings/useBookingId";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBookingId();

  const moveBack = useMoveBack();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const { checkinMutate, isCheckin } = useCheckin();
  const { isLoading: isSettings, setting } = useSettings();

  // console.log(setting); breakFastPrice

  useEffect(() => {
    setIsConfirm(booking?.isPaid || false);

    setIsBreak(booking?.hasBreakfast || false);
  }, [booking]);

  if (isLoading || isSettings) return <Spinner />;
  if (booking === undefined) return;

  // console.log(booking);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;
  const optionalPrice = setting.breakFastPrice * numGuests + numNights;

  function handleCheckin() {
    if (!isConfirm) return;
    if (isBreak) {
      checkinMutate({
        bookingId,
        breakFast: {
          hasBreakfast: true,
          totalPrice: optionalPrice + totalPrice,
          extraPrice: optionalPrice,
        },
      });
    } else checkinMutate({ bookingId, breakFast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          id="breakfast"
          checked={isBreak}
          onChange={() => {
            setIsBreak((isBreak) => !isBreak);
            setIsConfirm(false);
          }}
        >
          Do you want add breakfast for {optionalPrice} ?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          id="confirm"
          checked={isConfirm}
          onChange={() => setIsConfirm((isConfirm) => !isConfirm)}
          disabled={isConfirm}
        >
          I confirm that {guests.fullName} has paid the totla amount of
          {isBreak
            ? ` ${formatCurrency(
                totalPrice + optionalPrice
              )}  : (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalPrice
              )}) `
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          variations="primary"
          sizes="large"
          onClick={handleCheckin}
          disabled={!isConfirm}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variations="secondary" sizes="large" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
