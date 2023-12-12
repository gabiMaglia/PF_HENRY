import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  birthdate: "",
  dni: "",
  email: "",
  telephone: "",
  image: "",
  role: "customer",
  userAddress: {},
  userCredentials: {
    username: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const {
        name,
        dni,
        email,
        userCredentials: { username, password },
      } = action.payload;
      state.name = name;
      state.dni = dni;  
      state.email = email;
      state.userCredentials.username = username;
      state.userCredentials.password = password;
    },
  },
});

// export const { addUser } = userSlice.actions; //Opcion declaracion y exportacion al mismo tiempo

const addUser = userSlice.actions.addUser; //Declaracion addUser
export { addUser }//Exportacion addUser

export default userSlice.reducer;
