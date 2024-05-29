import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Uploader from "../data/Uploader";

const StyledApplayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  background-color: var(--color-grey-0);
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
`;
{
  /* <Uploader /> */
}

function Applayout() {
  return (
    <StyledApplayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledApplayout>
  );
}

export default Applayout;
