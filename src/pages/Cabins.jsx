import CabinTable from "../features/cabins/CabinTable";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

import styled from "styled-components";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";

const Container = styled.div`
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
function Cabins() {
  return (
    <>
      <Row>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <CabinTableOperation />
        </Row>
        <Container>
          <CabinTable />
        </Container>
      </Row>
      <div>
        <AddCabin />
      </div>
    </>
  );
}

export default Cabins;
