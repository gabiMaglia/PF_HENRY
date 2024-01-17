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

import Swal from "sweetalert2";

const useCheckAuthData = (openLoginModal) => {
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
            const resultado = await Swal.fire({
              icon: "info",
              title: "Tiempo de sesión expirado",
              text: "Su sesión ha expirado. Desea volver a iniciar sesion?",
              showCancelButton: true,
              confirmButtonText: "Si",
              cancelButtonText: "No gracias",
            });
            if (resultado.isConfirmed) {
              await logOutUser.logout();
              openLoginModal();
            } else {
              await logOutUser.logout();
            }
          } else {
            if (response.timeLeftInSeconds < 840) {
              const resultado = await Swal.fire({
                icon: "warning",
                title: "Tiempo de sesión agotándose",
                text: "Le queda poco tiempo a su sesión. ¿Desea renovar el token?",
                showCancelButton: true,
                confirmButtonText: "Renovar",
                cancelButtonText: "Cancelar",
              });
              if (resultado.isConfirmed) {
                const newToken = await refreshSessionToken(data.jwt);
                updateJwt(newToken, cookieStatus);
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
