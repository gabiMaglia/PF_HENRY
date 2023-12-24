import axios from "axios";
import {
  createPersistency,
  headerSetterForPetitions,
} from "../utils/authMethodSpliter";

// address = password
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const dataSorterForApp = (data) => {
  const decodeToken = JSON.parse(atob(data.tokenSession.split(".")[1]));
  return { ...data, userRole: decodeToken.userRole };
};

export const loginUser = async (username, password, cookieStatus) => {
  try {
    const axiosInstance = cookieStatus
      ? headerSetterForPetitions(cookieStatus)
      : headerSetterForPetitions(cookieStatus)(
          window.localStorage.getItem("jwt")
        );

    const { data } = await axiosInstance.post(`${url}/account/login`, {
      username: username,
      password: password,
    });

    if (data.login) {
      const sortedData = dataSorterForApp(data);
      createPersistency(sortedData, cookieStatus);

      return { error: false, data: sortedData };
    }
  } catch ({ response }) {
    return { error: response };
  }
};
export const googleLoginUser = async (cookieStatus) => {
  //
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
          const sortedData = dataSorterForApp(event.data);
          console.log(sortedData);
          createPersistency(sortedData, cookieStatus)
          
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
