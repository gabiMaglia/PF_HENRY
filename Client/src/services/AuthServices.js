import axios from "axios";
const url = import.meta.env.VITE_BACK_URL || "http://localhost:3001" ;

export const loginUser = async (username, password) => {
  try {
    const loginData = await axios.post(`${url}/account/login`, {
      username: username,
      password: password,
    });
    return loginData;
  } catch ({ response }) {
    return { error: response };
  }
};
export const googleLoginUser = async () => {
  try {
    const popup = window.open(`${url}/auth/google`, "targetWindow", `toolbar=no,
    location=no,
    status=no,
    menubar=no,
    scrollbars=yes,
    resizable=yes,
    width=620,
    height=700` )
    
    window.addEventListener("message", (event)=> {
      if(event.origin === `${url}`) {
        if (event.data) {
          localStorage.setItem("data", JSON.stringify(event.data))
          popup.close()
        }
      }
    })
  } catch ({ response }) {
    return { error: response };
  }
};
export const registerUser = async (userObj) => {
  try {
    const registerData = await axios.post(`${url}/account/signin`, {
      userObj,
    });
    return registerData;
  } catch ({ response }) {
    return { error: response };
  }
};
