import { HiOutlineBriefcase, HiOutlineCash } from "react-icons/hi";
import Stat from "./Stat";
import { ImStatsBars2 } from "react-icons/im";
import { FaCalendarAlt } from "react-icons/fa";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, staysConfirm, cabinCount, numDays }) {
  // 1
  const numBookings = bookings.length;
  // 2
  const sales = bookings?.reduce((acc, curr) => acc + curr?.totalPrice, 0);
  // 3 status : checked-in
  const checkIns = staysConfirm.length;

  // 4 stats
  const occupency =
    staysConfirm.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount.length);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title={"BOOKINGS"}
        value={numBookings}
        color={"blue"}
      />
      <Stat
        icon={<HiOutlineCash />}
        title={"SALES"}
        value={formatCurrency(sales)}
        color={"green"}
      />
      <Stat
        icon={<FaCalendarAlt />}
        title={"CHECK INS"}
        value={checkIns}
        color={"brand"}
      />
      <Stat
        icon={<ImStatsBars2 />}
        title={"SALES"}
        value={Math.round(occupency * 100) + "%"}
        color={"yellow"}
      />
    </>
  );
}

export default Stats;
