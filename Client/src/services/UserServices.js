import axios from "axios"
const url = import.meta.env.VITE_BACK_URL

export const getAllUsers = async () => {
    try {
      const AllUsers = await axios.get(`${url}/users/`);
      return AllUsers;
    } catch ({ AllUsers }) {
      return { error: AllUsers };
    }
  };

export const GetUserById = async () => {
    try {
        const ById = await axios.get(`${url}/users/:id`)
        return ById;
    } catch ({ById}) {
        return { error: ById };
    }
};

export const PostUser = async () => {
    try {
        const NewUser = await axios.post(`${url}/users/`)
        return NewUser;
    } catch ({NewUser}) {
        return { error: NewUser };
    }
}

export const PutUser = async () => {
    try {
        const PutUser = await axios.put(`${url}/users/:id`)
        return PutUser;
    } catch ({ PutUser }) {
        return { error: PutUser };
    }
}

export const DeleteUser = async () => {
    try {
        const DeleteUser = await axios.delete(`${url}/users/:id`)
        return DeleteUser;
    } catch ({ DeleteUser }) {
        return { error: DeleteUser };
    }
}

