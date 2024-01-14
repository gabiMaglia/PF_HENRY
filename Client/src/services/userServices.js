//AXIOS
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const getAllUsers = async (jwt) => {
  try {
    const AllUsers = await axios.get(`${url}/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return AllUsers;
  } catch (error) {
    return { error: error };
  }
};

export const getUsersByRole = async (role, jwt) => {
  try {
    const AllUsers = await axios.get(`${url}/user_role/by_role/${role}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return AllUsers;
  } catch (error) {
    return { error: true, data: error };
  }
};

export const isDeleteChange = async (id, jwt) => {
  try {
    const deleteChanges = await Promise.all(
      id.map((id) => {
        return axios.delete(`${url}/account/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
      })
    );
    return deleteChanges;
  } catch (error) {
    return { error: error };
  }
};

export const getUserRoles = async (jwt) => {
  try {
    const roles = await axios.get(`${url}/user_role`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return roles;
  } catch (error) {
    return { error: error };
  }
};

export const getUserById = async (id, jwt) => {
  try {
    const byId = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = byId;
    return data;
  } catch (error) {
    return { error: error };
  }
};

export const postUser = async (jwt) => {
  try {
    const newUser = await axios.post(`${url}/users/`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return newUser;
  } catch (error) {
    return { error: error };
  }
};

export const putUser = async (id, userRole, data) => {
  let completeData = {
    name: null,
    surname: null,
    birthdate: null,
    dni: null,
    email: "",
    telephone: null,
    image: null,
    role: "customer",
    communication_preference: "",
    userAddress: {
      country: null,
      state: null,
      city: null,
      street: null,
      number: null,
      zipCode: null,
    },
    userCredentials: {},
  };
  try {
    completeData = { ...completeData, ...data, role: userRole };
    const putUser = await axios.put(`${url}/user/${id}`, {
      ...completeData,
      withCredentials: true,
    });

    const responseData = putUser;
    return responseData;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (jwt) => {
  try {
    const deleteUser = await axios.delete(`${url}/users/:id`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return deleteUser;
  } catch (error) {
    return { error: error };
  }
};
