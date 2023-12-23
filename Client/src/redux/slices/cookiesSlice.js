import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cookiesAccepted: false,
    boxEnable: true
}
const cookiesSlice = createSlice({
    name: 'cookies',
    initialState,
    reducers: {
        acceptCookie(state, action) {
            state.cookiesAccepted = action.payload;
        },
        cookieBoxEnable(state, action) {
              console.log(action.payload)
              window.localStorage.setItem('showCoookieBox', action.payload)
              state.boxEnable = false;
        },

    }
})

export const { acceptCookie, cookieBoxEnable } = cookiesSlice.actions;
export default cookiesSlice.reducer;