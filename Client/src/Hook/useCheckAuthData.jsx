import { useSelector } from "react-redux";
import {
  getDataFromSelectedPersistanceMethod,
  updateJwt,
} from "../utils/authMethodSpliter";
import {
  checkSessionStatus,
  refreshSessionToken,
} from "../services/authServices";
import useLogoutUser from "./useLogoutUser";

const useCheckAuthData = () => {
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const logOutUser = useLogoutUser(cookieStatus);
  const data = getDataFromSelectedPersistanceMethod(cookieStatus);
  if (data === undefined) {
    const checkToken = () => {
      console.log("usuario anonimo");
    };
    return { checkToken };
  } else {
    const checkToken = async () => {
      try {
        if (data.login) {
          const response = await checkSessionStatus(data.jwt);
          console.log(response);
          if (response.error) {
            alert("ha expirado la sesion, vuelva a iniciar sesion");
            await logOutUser.logout();
            console.log(response);
          } else {
            if (response.timeLeftInSeconds < 840) {
              const resultado = window.confirm(
                "le queda poco tiempo a su session desea renovar el token?"
              );
              if (resultado) {
                console.log("llego a la renov");
                const newToken = await refreshSessionToken(data.jwt);
                updateJwt(newToken, cookieStatus);
                console.log(newToken);
              } else {
                null;
              }
            }
          }
        }
      } catch (error) {
        console.log("Error al verificar el estado de la sesión");
      }
    };
    return { checkToken };
  }
};

export default useCheckAuthData;
