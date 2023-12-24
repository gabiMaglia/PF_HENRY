//HOOKS
import { configureStore } from "@reduxjs/toolkit";
//REDUX
import userReducer from "./slices/userSlice";
import cookiesReducer from "./slices/cookiesSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import categoriesReducer from "./slices/categoriesSlice";
import wishlistReducer from "./slices/wishListSlice";

import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer,
    cookies: cookiesReducer,
    product: productReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    wishlist: wishlistReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
