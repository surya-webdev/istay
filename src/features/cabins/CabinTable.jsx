import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import getCabin from "../../services/cabinApi";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { useParams, useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  let filterCabin;
  const cabins = useQuery({ queryKey: ["cabins"], queryFn: getCabin });

  const { data: cabin, error, isLoading } = cabins;

  const [searchParams] = useSearchParams();

  let filterValue = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;

  if (cabin === undefined) return;

  if (filterValue === "all") filterCabin = cabin;

  if (filterValue === "no-discount")
    filterCabin = cabin.filter((el) => el.discount === 0);

  if (filterValue === "with-discount")
    filterCabin = cabin.filter((el) => el.discount > 0);

  let sortValue = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortValue.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filterCabin.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <>
      <Table columns=" 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={filterCabin}
          data={sortedCabins}
          render={(el) => <CabinRow cabin={el} key={el.id} />}
        />
      </Table>
    </>
  );
}

export default CabinTable;
