import Cookies from "js-cookie";

// Nombres de las cookies
// Funciones para manejar las cookies para el token

export const setAuthDataCookie = async (cookieName, cookieData) => {
  if (cookieData !== undefined) {
    const serialized = JSON.stringify(cookieData);
    Cookies.set(cookieName, serialized, {
      expires: 1,
      sameSite: "None",
      secure: true,
    });
  }
};

export const getAuthDataCookie = (cookieName) => {
  const cookie = Cookies.get(cookieName);
  try {
    if (cookie !== undefined) {
      const deserialized = JSON.parse(cookie);
      return deserialized;
    }
  } catch (error) {
    return cookie;
  }
};

export const removeAuthDataCookie = (cookieName) => {
  Cookies.remove(cookieName);
};
