import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const Heading = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

function Header() {
  return (
    <Heading>
      <UserAvatar />
      <HeaderMenu />
    </Heading>
  );
}

export default Header;
