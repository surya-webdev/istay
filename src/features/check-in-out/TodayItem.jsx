import styled from "styled-components";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "./useCheckOut";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const navigate = useNavigate();
  const { checkOutMutate, isCheckOut } = useCheckOut();
  return (
    <StyledTodayItem>
      {status === "checked-in" && <Tag type="green">Departed</Tag>}
      {status === "unconfirmed" && <Tag type="blue">Arriving</Tag>}
      <Flag src={guests.countryFlag} alt={guests.nationality} />
      <Heading as="p">{guests.fullName}</Heading>
      <p>{numNights + "  " + "nights"}</p>
      {status === "unconfirmed" && (
        <Button
          variations="primary"
          onClick={() => navigate(`/checking/${id}`)}
        >
          Check In
        </Button>
      )}
      {status === "checked-in" && (
        <Button variations="primary" onClick={() => checkOutMutate(id)}>
          Check Out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
