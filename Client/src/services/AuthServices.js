import axios from "axios";
import {
  setAuthDataCookie,
} from "../utils/cookiesFunctions";

// address = password
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export const loginUser = async (username, password) => {
  try {
    const { data } = await axios.post(
      `${url}/account/login`,
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    if (data.login) {
      const decodeToken = JSON.parse(atob(data.tokenSession.split(".")[1]));
      setAuthDataCookie("authData", {
        ...data,
        userRole: decodeToken.userRole,
      });

      return { error: false, data };
    }
  } catch ({ response }) {
    return { error: response };
  }
};
export const googleLoginUser = async () => {
  try {
    const popup = window.open(
      `${url}/auth/google`,
      "targetWindow",
      `toolbar=no,
        location=no,
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=yes,
        width=620,
        height=700`
    );
    return new Promise((resolve) => {
      window.addEventListener("message", (event) => {
        if (event.origin === `${url}` && event.data) {
          const decodeToken = JSON.parse(
            atob(event.data.tokenSession.split(".")[1])
          );
          setAuthDataCookie("authData", {
            ...event.data,
            userRole: decodeToken.userRole,
          });
          popup.close();
          resolve({ data: event.data });
        }
      });
    });
  } catch ({ response }) {
    return { error: response };
  }
};
export const registerUser = async (userObj) => {
  try {
    const registerData = await axios.post(`${url}/account/signin`, {
      userObj,
    });
    return { error: false, data: registerData };
  } catch ({ response }) {
    return { error: response.data };
  }
};
