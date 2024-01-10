import axios from "axios";
import {
  createPersistency,
} from "../utils/authMethodSpliter";

// address = password
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const dataSorterForApp = (data) => {
  const decodeToken = JSON.parse(atob(data.tokenSession.split(".")[1]));
  return { ...data, userRole: decodeToken.userRole };
};

export const loginUser = async (username, password, cookieStatus) => {
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
      if (!popup) {
        throw new Error("Failed to open the authentication window");
      }
      console.log('object')
      return new Promise((resolve) => {
        window.addEventListener("message", (event) => {
        
          if (event.origin === `${url}` && event.data) {
          
            if (event.data.error) {
              popup.close();
              resolve({ error: true , response: event.data.response });
       
            }else {
              const sortedData = dataSorterForApp(event.data);
              createPersistency(sortedData, cookieStatus);
              popup.close();
              resolve({ data: event.data });
            }
            
          }
        });
      });
    } catch ( error ) {
      console.error("Error during Google authentication:", error.response);
      return { error: error.response.message || "An error occurred during authentication" };

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
export const logOutUser = async () => {
  try {
    const response = await axios.post(`${url}/account/logout`);
    return { error: false, data: response };
  } catch ({ response }) {
    return { error: response.data };
  }
};
