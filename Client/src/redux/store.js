import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/CartSlice";

import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
