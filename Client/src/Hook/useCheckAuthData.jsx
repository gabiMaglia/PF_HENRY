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
            // alert("ha expirado la sesion, vuelva a iniciar sesion");
            Swal.fire({
              icon: "info",
              title: "Tiempo de sesión expirado",
              text: "Su sesión a expirado. Vuelva a iniciar sesión",
              showCancelButton: true,
              confirmButtonText: "Iniciar",
              cancelButtonText: "Cancelar",
            }).then(async () => {
              await logOutUser.logout();
              openLoginModal();
            });
          } else {
            if (response.timeLeftInSeconds < 840) {
              // const resultado = window.confirm(
              //   "le queda poco tiempo a su session desea renovar el token?"
              // );
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
