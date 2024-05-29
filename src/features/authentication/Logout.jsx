import { IoLogOut } from "react-icons/io5";
import ButtonIcon from "../../ui/ButtonIcon";
import { useUserLogout } from "./useUserLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logoutMutate, isLoading } = useUserLogout();

  return (
    <ButtonIcon>
      {!isLoading ? (
        <IoLogOut onClick={logoutMutate} disabled={isLoading} />
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
