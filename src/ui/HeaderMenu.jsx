import styled from "styled-components";
import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import { useContextDark } from "../context/DarkModeContext";

const Header = styled.ul`
  list-style: none;
  display: flex;
  gap: 0.5rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isDark, toggle } = useContextDark();

  return (
    <Header>
      <li>
        <ButtonIcon onClick={() => navigate("/accounts")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={toggle}>
          {isDark ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </Header>
  );
}

export default HeaderMenu;
