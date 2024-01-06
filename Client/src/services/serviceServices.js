//AXIOS
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const createNewService = async (serviceInfo, technicianId, imageUrl) => {
  try {
    serviceInfo.product_image = imageUrl;
    serviceInfo.technicianId = technicianId;
    const response = await axios.post(`${url}/service`, serviceInfo, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return { error: true, response: "Falla en la creación del servicio" };
  }
};

export const getServices = async (id) => {
  try {
    let completeUrl = `${url}/service`;
    id &&
      ((completeUrl = `${url}/service/client/${id}`),
      { withCredentials: true });
    const response = await axios.get(completeUrl);
    return response;
  } catch (error) {
    return { error };
  }
};

export const getServicesById = async (id) => {
  try {
    if (id) {
      const response = await axios.get(`${url}/service/${id}`, {
        withCredentials: true,
      });
      return response;
    }
  } catch (error) {
    return { error };
  }
};

export const filterService = async (status, user, technician) => {
  try {
    const response = await axios.get(`${url}/service/filter`, {
      params: {
        status: status,
        user: user,
        technician: technician,
      },
      withCredentials: "true",
    });

    return response;
  } catch (error) {
    return { error };
  }
};

export const updateServiceStatus = async (id, updatedArray) => {
  try {
    const response = await Promise.all(
      updatedArray.map((item) => {
        return axios.put(
          `${url}/service/${id}`,
          {
            field: item.status,
            value: item.value,
          },
          {
            withCredentials: true,
          }
        );
      })
    );
    return response;
  } catch (error) {
    return { error: true, response: error };
  }
};

//Estaba de antes no lo quise borrar por las dudas
export const GetAllRoles = async () => {
  try {
    const GetRol = await axios.get(`${url}/user_role`, {
      withCredentials: true,
    });
    return GetRol;
  } catch ({ GetRol }) {
    return { error: GetRol };
  }
};

export const CreateNewRole = async () => {
  try {
    const PostRol = await axios.post(`${url}/user_role/create`, {
      withCredentials: true,
    });
    return PostRol;
  } catch ({ PostRol }) {
    return { error: PostRol };
  }
};
