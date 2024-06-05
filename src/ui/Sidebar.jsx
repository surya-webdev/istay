import Uploader from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";
import styled from "styled-components";

const Stylesidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  grid-row: 1/-1;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function Sidebar() {
  return (
    <Stylesidebar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </Stylesidebar>
  );
}

export default Sidebar;
