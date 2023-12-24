import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  cookiesAccepted: false,
  boxEnable: true,
};

const cookiesSlice = createSlice({
  name: "cookies",
  initialState,
  reducers: {
    acceptCookie(state, action) {
      window.localStorage.setItem("cookieAccepted", action.payload);
      state.cookiesAccepted = JSON.parse(action.payload);
    },
    cookieBoxEnable(state, action) {
      window.localStorage.setItem("showCoookieBox", action.payload);
      state.boxEnable = false;
    },
  },
});

export const rejectCookies = () => {
  const allCookies = Cookies.get();
  console.log(allCookies);
  const allCookiesKeys = Object.keys(allCookies);
  console.log(allCookiesKeys);
  allCookiesKeys.map((cookie) => {
    Cookies.remove(cookie);
  });
};

export const { acceptCookie, cookieBoxEnable } = cookiesSlice.actions;
export default cookiesSlice.reducer;
