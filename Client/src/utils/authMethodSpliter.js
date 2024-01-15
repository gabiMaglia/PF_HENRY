import { getAuthDataCookie, setAuthDataCookie } from "./cookiesFunctions";
import { rejectCookies } from "../redux/slices/cookiesSlice";
import axios from "axios";
//
// ESTE ARCHIVO SE ENCARGA DE DETERMINAR SEGUN LA ELECCION DE USAR COOKIES O NO
// DE DONDE SE SACARA LA INFORMACION DE PERSISTENCIA
// DEPENDIENDO DE CUAL SEA LA ACCION QUE SE NECESITE, CREAR, LEER O ELIMINAR
//
export const createPersistency = (sortedData, cookieStatus) => {
  if (cookieStatus) {
    setAuthDataCookie("authData", {
      login: sortedData.login,
      jwt: sortedData.tokenSession,
      userId: sortedData.userId,
      userRole: sortedData.userRole,
    });
  } else {
    window.localStorage.setItem("jwt", sortedData.tokenSession);
    window.localStorage.setItem("login", sortedData.login);
    window.localStorage.setItem("userId", sortedData.userId);
    window.localStorage.setItem("userRole", sortedData.userRole);
  }
};
export const updateJwt = (jwt, cookieStatus) => {
  if (cookieStatus) {
    console.log('pasoporaca')
    const cookie = getAuthDataCookie("authData");
    cookie.jwt = jwt
    setAuthDataCookie('authData', cookie)
  } else {
    window.localStorage.removeItem("jwt", jwt);
    window.localStorage.setItem("jwt", jwt);
   
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

export const clearPersistanceData = (cookieStatus, bool) => {
  if (cookieStatus) rejectCookies(bool);
  else {
      window.localStorage.removeItem("jwt"),
      window.localStorage.removeItem("login"),
      window.localStorage.removeItem("userId"),
      window.localStorage.removeItem("userRole");
  }
};


