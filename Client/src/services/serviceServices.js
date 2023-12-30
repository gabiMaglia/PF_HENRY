//AXIOS
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const createNewService = async (serviceInfo, technicianId, imageUrl) => {
  try {
    serviceInfo.product_image = imageUrl;
    serviceInfo.technicianId = technicianId;
    const response = await axios.post(`${url}/service`, serviceInfo);
    return response;
  } catch (error) {
    return { error: true, response: "Falla en la creación del servicio" };
  }
};

export const getServices = async (id) => {
  try {
    let completeUrl = `${url}/service`;
    id && (completeUrl = `${url}/service/client/${id}`);
    const response = await axios.get(completeUrl);
    return response;
  } catch (error) {
    return { error };
  }
};

export const getServicesById = async (id) => {
  try {
    const response = await axios.get(`${url}/service/${id}`);
    return response;
  } catch (error) {
    return { error };
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
