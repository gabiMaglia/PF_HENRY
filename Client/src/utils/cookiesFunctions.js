import Cookies from "js-cookie";

// Nombres de las cookies
const AUTHDATA_COOKIE_NAME = "authData";

// Funciones para manejar las cookies para el token
export const setAuthDataCookie = (authData) => {
  Cookies.set(AUTHDATA_COOKIE_NAME, authData, {
    expires: 1,
    sameSite: "None",
    secure: true,
  });
};

export const getAuthDataCookie = () => {
  const cookie = Cookies.get(AUTHDATA_COOKIE_NAME);
  return cookie;
};

export const removeAuthDataCookie = () => {
  Cookies.remove(AUTHDATA_COOKIE_NAME);
};
