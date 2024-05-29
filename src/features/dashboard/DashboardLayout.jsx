import styled from "styled-components";
import { useBookingDays } from "./useBookingDays";
import { useBookingsStays } from "./useBookingStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useQuery } from "@tanstack/react-query";
import getCabin from "../../services/cabinApi";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const cabins = useQuery({ queryKey: ["cabins"], queryFn: getCabin });
  const { data: cabin, isLoading: isLoading3 } = cabins;

  const { isBookings, isLoading, numDays } = useBookingDays();

  const { stays, isLoading: IsStaying, staysConfirm } = useBookingsStays();

  if (isLoading || isLoading3 || IsStaying) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={stays}
        staysConfirm={staysConfirm}
        cabinCount={cabin}
        numDays={numDays}
      />
      <Today />
      <DurationChart confirmStays={stays} />
      <SalesChart bookings={stays} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
