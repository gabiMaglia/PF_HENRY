import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

import thunkMiddleware from 'redux-thunk'

const store = configureStore({
    reducer: {
      user: userReducer,
    },
    middleware: [thunkMiddleware],
})

export default store; 