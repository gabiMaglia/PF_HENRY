//HOOKS
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  name: "",
  surname: "",
  birthdate: "",
  dni: "",
  communication_preference: "",
  email: "",
  telephone: "",
  image: "",
  role: null,
  userAddress: {
    country: "",
    state: "",
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
      state.login = true;
      state.name = userObject.name;
      state.surname = userObject.surname;
      state.communication_preference = userObject.communication_preference;
      state.birthdate = userObject.birthdate;
      state.email = userObject.email;
      state.dni = userObject.dni;
      state.telephone = userObject.telephone;
      state.image = userObject.image;
      state.role = userObject.rolId;
      state.userAddress.country = UserAddress.country;
      state.userAddress.state = UserAddress.state;
      state.userAddress.city = UserAddress.city;
      state.userAddress.street = UserAddress.street;
      state.userAddress.number = UserAddress.number;
      state.userAddress.zipCode = UserAddress.zipCode;
    },
    logoutUser: (state) => {
      state.login = false;
      state.name = "";
      state.surname = "";
      state.birthdate = "";
      state.email = "";
      state.dni = "";
      state.telephone = "";
      state.image = "";
      state.role = null;
      state.userAddress.country = "";
      state.userAddress.state = "";
      state.userAddress.city = "";
      state.userAddress.street = "";
      state.userAddress.number = "";
      state.userAddress.zipCode = "";
    },
    updateInfo: (state, { payload }) => {
      const { userObject } = payload;
      const UserAddress = userObject?.UserAddress;
      userObject?.name && (state.name = userObject.name);
      userObject?.surname && (state.surname = userObject.surname);
      userObject?.communication_preference &&
        (state.communication_preference = userObject.communication_preference);
      userObject?.birthdate && (state.birthdate = userObject.birthdate);
      userObject?.email && (state.email = userObject.email);
      userObject?.dni && (state.dni = userObject.dni);
      userObject?.telephone && (state.telephone = userObject.telephone);
      userObject?.image && (state.image = userObject.image);
      userObject?.rolId && (state.role = userObject.rolId);
      if (UserAddress) {
        UserAddress?.country &&
          (state.userAddress.country = UserAddress.country);
        UserAddress?.state && (state.userAddress.state = UserAddress.state);
        UserAddress?.city && (state.userAddress.city = UserAddress.city);
        UserAddress?.street && (state.userAddress.street = UserAddress.street);
        UserAddress?.number && (state.userAddress.number = UserAddress.number);
        UserAddress?.zipCode &&
          (state.userAddress.zipCode = UserAddress.zipCode);
      }
    },
  },
});

export const { logUser, logoutUser, updateInfo } = userSlice.actions;
export default userSlice.reducer;
