import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  name: "",
  surname: "",
  birthdate: "",
  dni: "",
  email: "",
  telephone: "",
  image: "",
  userAddress: {
    country: "",
    state : "",
    city: "",
    street: "",
    number: null,
    zipCode: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logUser: (state, { payload }) => {
      const { userObject } = payload;
      const { UserAddress } = userObject;
      state.login = true
      state.name = userObject.name;
      state.surname = userObject.surname;
      state.birthdate = userObject.birthdate;
      state.email = userObject.email;
      state.telephone = userObject.telephone;
      state.image = userObject.image;
      state.userAddress.country = UserAddress.country;
      state.userAddress.state = UserAddress.state;
      state.userAddress.city = UserAddress.city;
      state.userAddress.street = UserAddress.street;
      state.userAddress.number = UserAddress.number;
      state.userAddress.zipCode = UserAddress.zipCode;

      console.log(state.name)
    },
    logoutUser: (state, action ) => {

      state.login = false
      state.name = "";
      state.surname = "";
      state.birthdate = "";
      state.email = "";
      state.telephone = "";
      state.image = "";
      state.userAddress.country = "";
      state.userAddress.state = "";
      state.userAddress.city = "";
      state.userAddress.street ="";
      state.userAddress.number = "";
      state.userAddress.zipCode ="";

      console.log(state.name)
    },
  },
});

export const { logUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
