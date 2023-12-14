import Cookies from "js-cookie";

// Nombres de las cookies
const AUTHDATA_COOKIE_NAME = "authData";

// Funciones para manejar las cookies para el token
export const setAuthDataCookie = (authData) => {
  const serialized = JSON.stringify(authData);
  Cookies.set(AUTHDATA_COOKIE_NAME, serialized, {
    expires: 1,
    sameSite: "None",
    secure: true,
  });
};

export const getAuthDataCookie = () => {
  const cookie = Cookies.get(AUTHDATA_COOKIE_NAME);
  if (cookie !== undefined) {
    const deserialized = JSON.parse(cookie);
    return deserialized;
  }
};

export const removeAuthDataCookie = () => {
  Cookies.remove(AUTHDATA_COOKIE_NAME);
};
