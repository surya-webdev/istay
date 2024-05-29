import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

const Fullpage = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProctedUser({ children }) {
  const navigate = useNavigate();
  // 1.
  const { isAuthUserCheck, isAuthUserLoading, isUserAuth } = useUser();

  // 2.
  if (!isUserAuth && !isAuthUserLoading)
    return navigate("/login", { replace: true });
  // 3.return the spinner if it loads
  if (isAuthUserLoading)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );
  // 4.Return if is it autenticated user
  if (isUserAuth) return children;
}

export default ProctedUser;
