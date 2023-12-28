//AXIOS
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const createNewService = async (serviceInfo, technicianId) => {
  try {
    serviceInfo.technicianId = technicianId;
    const response = await axios.post(`${url}/service`, serviceInfo);
    return response;
  } catch (error) {
    return error;
  }
};

//Estaba de antes no lo quise borrar por las dudas
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
