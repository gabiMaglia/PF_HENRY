import axios from "axios";
const url = import.meta.env.VITE_BACK_URL;

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
    const loginData = await axios.get(`${url}/auth/google`);
    return loginData;
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
