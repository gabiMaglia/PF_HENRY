//AXIOS
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const getAllUsers = async () => {
  try {
    const AllUsers = await axios.get(`${url}/user`);
    return AllUsers;
  } catch (error) {
    return { error: error };
  }
};

export const getUsersByRole = async (role, userAuthData) => {
  try {
    const AllUsers = await axios.get(`${url}/user_role/by_role/${role}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userAuthData}`,
      },
    });
    return AllUsers;
  } catch (error) {
    return { error: true, data: error };
  }
};

export const getUserRoles = async (userAuthData) => {
  try {
    const roles = await axios.get(`${url}/user_role`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userAuthData}`,
      },
    });
    return roles;
  } catch (error) {
    return { error: error };
  }
};

export const getUserById = async (id) => {
  try {
    const ById = await axios.get(`${url}/user/${id}`);
    const { data } = ById;
    return data;
  } catch ({ ById }) {
    return { error: ById };
  }
};

export const PostUser = async () => {
  try {
    const NewUser = await axios.post(`${url}/users/`);
    return NewUser;
  } catch ({ NewUser }) {
    return { error: NewUser };
  }
};

export const PutUser = async (id, userRole, data) => {
  let completeData = {
    name: null,
    surname: null,
    birthdate: null,
    dni: null,
    email: "",
    telephone: null,
    image: null,
    role: "customer",
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

export const DeleteUser = async () => {
  try {
    const DeleteUser = await axios.delete(`${url}/users/:id`);
    return DeleteUser;
  } catch ({ DeleteUser }) {
    return { error: DeleteUser };
  }
};
