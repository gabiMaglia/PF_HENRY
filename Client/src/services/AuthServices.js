import axios from "axios";
const url = import.meta.env.VITE_BACK_URL

export const getUserCredById = async () => {
    try {
        const GetCred = await axios.get(`${url}/user_credentials/:id`);
        return GetCred;
      } catch ({ GetCred }) {
        return { error: GetCred };
      }
}

export const editUserCredById = async () => {
    try {
        const editCred = await axios.put(`${url}/user_credentials/:id`);
        return editCred;
      } catch ({ editCred }) {
        return { error: editCred };
      }
}

