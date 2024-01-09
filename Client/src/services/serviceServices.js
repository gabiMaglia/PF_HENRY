//AXIOS
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const createNewService = async (serviceInfo, technicianId, imageUrl, jwt) => {
  try {
    serviceInfo.product_image = imageUrl;
    serviceInfo.technicianId = technicianId;
    const response = await axios.post(`${url}/service`, serviceInfo, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });
    return response;
  } catch (error) {
    return { error: true, response: "Falla en la creación del servicio" };
  }
};

export const getServices = async (id, jwt) => {
  try {
    let completeUrl = `${url}/service`;
    id &&
      ((completeUrl = `${url}/service/client/${id}`));
      
        
    const response = await axios.get(completeUrl, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });
    return response;
  } catch (error) {
    return { error };
  }
};

export const getServicesById = async (id, jwt) => {
  try {
    if (id) {
      const response = await axios.get(`${url}/service/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      return response;
    }
  } catch (error) {
    return { error };
  }
};

export const filterService = async (status, user, technician, jwt) => {
  try {
    const response = await axios.get(`${url}/service/filter`, {
      params: {
        status: status,
        user: user,
        technician: technician,
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    });

    return response;
  } catch (error) {
    return { error };
  }
};

export const updateServiceStatus = async (id, updatedArray, jwt) => {
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
            headers: {
              Authorization: `Bearer ${jwt}`,
            }
          }
        );
      })
    );
    return response;
  } catch (error) {
    return { error: true, response: error };
  }
};

