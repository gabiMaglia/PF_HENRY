//AXIOS
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const GetAllRoles = async () => {
  try {
    const GetRol = await axios.get(`${url}/user_role`);
    return GetRol;
  } catch ({ GetRol }) {
    return { error: GetRol };
  }
};

export const CreateNewRole = async () => {
  try {
    const PostRol = await axios.post(`${url}/user_role/create`);
    return PostRol;
  } catch ({ PostRol }) {
    return { error: PostRol };
  }
};
