import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/ProducSlice"

import thunkMiddleware from 'redux-thunk'

const store = configureStore({
    reducer: {
      user: userReducer,
      product: productReducer,
    },
    middleware: [thunkMiddleware],
})

export default store; 