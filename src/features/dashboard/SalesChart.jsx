import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useContextDark } from "../../context/DarkModeContext";
import {
  eachDayOfInterval,
  format,
  formatDate,
  isSameDay,
  subDays,
} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalPrice: 480, extraPrice: 20 },
  { label: "Jan 10", totalPrice: 580, extraPrice: 100 },
  { label: "Jan 11", totalPrice: 550, extraPrice: 150 },
  { label: "Jan 12", totalPrice: 600, extraPrice: 50 },
  { label: "Jan 13", totalPrice: 700, extraPrice: 150 },
  { label: "Jan 14", totalPrice: 800, extraPrice: 150 },
  { label: "Jan 15", totalPrice: 700, extraPrice: 200 },
  { label: "Jan 16", totalPrice: 650, extraPrice: 200 },
  { label: "Jan 17", totalPrice: 600, extraPrice: 300 },
  { label: "Jan 18", totalPrice: 550, extraPrice: 100 },
  { label: "Jan 19", totalPrice: 700, extraPrice: 100 },
  { label: "Jan 20", totalPrice: 800, extraPrice: 200 },
  { label: "Jan 21", totalPrice: 700, extraPrice: 100 },
  { label: "Jan 22", totalPrice: 810, extraPrice: 50 },
  { label: "Jan 23", totalPrice: 950, extraPrice: 250 },
  { label: "Jan 24", totalPrice: 970, extraPrice: 100 },
  { label: "Jan 25", totalPrice: 900, extraPrice: 200 },
  { label: "Jan 26", totalPrice: 950, extraPrice: 300 },
  { label: "Jan 27", totalPrice: 850, extraPrice: 200 },
  { label: "Jan 28", totalPrice: 900, extraPrice: 100 },
  { label: "Jan 29", totalPrice: 800, extraPrice: 300 },
  { label: "Jan 30", totalPrice: 950, extraPrice: 200 },
  { label: "Jan 31", totalPrice: 1100, extraPrice: 300 },
  { label: "Feb 01", totalPrice: 1200, extraPrice: 400 },
  { label: "Feb 02", totalPrice: 1250, extraPrice: 300 },
  { label: "Feb 03", totalPrice: 1400, extraPrice: 450 },
  { label: "Feb 04", totalPrice: 1500, extraPrice: 500 },
  { label: "Feb 05", totalPrice: 1400, extraPrice: 600 },
  { label: "Feb 06", totalPrice: 1450, extraPrice: 400 },
];

function SalesChart({ bookings, numDays }) {
  // booking is a array of hotel data
  // numDays = 7 or 30 or 90
  console.log(bookings);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // console.log(allDates);

  const data = allDates.map((date) => {
    return {
      label: format(date, "MM dd"),
      totalPrice: bookings
        .filter((el) => isSameDay(date, new Date(el.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extraPrice: bookings
        .filter((el) => isSameDay(date, new Date(el.created_at)))
        .reduce((acc, curr) => acc + curr.extraPrice, 0),
    };
  });

  console.log(data);

  const { isDark } = useContextDark();

  const colors = isDark
    ? {
        totalPrice: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraPrice: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalPrice: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraPrice: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  console.log(data);
  return (
    <StyledSalesChart>
      <Heading as="h3">
        Sales from {format(allDates[0], " dd - MM - yyyy")} to{" "}
        {format(allDates.at(-1), "dd -MM -yyyy")}
      </Heading>

      <ResponsiveContainer width={"100%"} height={400}>
        <AreaChart data={data} width={700} height={300}>
          <CartesianGrid strokeDasharray={4} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="₹"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            dataKey="totalPrice"
            type="monotone"
            stroke={colors.totalPrice.stroke}
            fill={colors.totalPrice.fill}
            name="Total Sales"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
          <Area
            dataKey="extraPrice"
            type="monotone"
            stroke={colors.extraPrice.stroke}
            fill={colors.extraPrice.fill}
            name="Extra Sales"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
