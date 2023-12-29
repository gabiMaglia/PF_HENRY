//HOOKS
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

export const rejectCookies = (bool) => {
  const allCookies = Cookies.get();
  const allCookiesKeys = Object.keys(allCookies);
  if (bool) {
    allCookiesKeys.map((cookie) => {
     Cookies.remove(cookie);
    });
  }else { 
  allCookiesKeys.map((cookie) => {
   cookie !=='connect.sid' && Cookies.remove(cookie);
  });
    }
  

};

export const { acceptCookie, cookieBoxEnable } = cookiesSlice.actions;
export default cookiesSlice.reducer;
