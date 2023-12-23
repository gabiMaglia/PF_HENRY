import Cookies from "js-cookie";
import { getAuthDataCookie, setAuthDataCookie } from "./cookiesFunctions";
import { rejectCookies } from "../redux/slices/cookiesSlice";

// ESTE ARCHIVO SE ENCARGA DE DETERMINAR SEGUN LA ELECCION DE USAR COOKIES O NO
// DE DONDE SE SACARA LA INFORMACION DE PERSISTENCIA
// DEPENDIENDO DE CUAL SEA LA ACCION QUE SE NECESITE, CREAR, LEER O ELIMINAR
// 


export const createPersistency = (sortedData, cookieStatus) => {
  if (cookieStatus) {
    setAuthDataCookie("authData", {
      login: sortedData.login,
      userId: sortedData.userId,
      userRole: sortedData.userRole,
    });
  } else {
    const jwt = Cookies.get("jwt");
    window.localStorage.setItem("jwt", JSON.stringify(jwt));
    window.localStorage.setItem("login", sortedData.login);
    window.localStorage.setItem("userId", sortedData.userId);
    window.localStorage.setItem("userRole", sortedData.userRole);
  }
};

export const getDataFromSelectedPersistanceMethod = (cookieStatus) => {
  if (cookieStatus) {
    return getAuthDataCookie("authData");
  } else
    return {
      jwt: window.localStorage.getItem("jwt"),
      login: window.localStorage.getItem("login"),
      userId: window.localStorage.getItem("userId"),
      userRole: window.localStorage.getItem("userRole"),
    };
};

export const clearPersistanceData = (cookieStatus) => {
  console.log("llego");
  if (cookieStatus) rejectCookies();
  else {
    window.localStorage.removeItem("jwt"),
    window.localStorage.removeItem("login"),
    window.localStorage.removeItem("userId"),
    window.localStorage.removeItem("userRole")
  }
};
