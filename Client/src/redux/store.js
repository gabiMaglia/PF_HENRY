//HOOKS
import { configureStore } from "@reduxjs/toolkit";
//REDUX
import userReducer from "./slices/userSlice";

import cookiesReducer from "./slices/cookiesSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import categoriesReducer from "./slices/categoriesSlice";
import brandsReducer from "./slices/brandsSlice";
import wishlistReducer from "./slices/wishListSlice";
import historyUserReducer from "./slices/historySlice";

import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer,
    cookies: cookiesReducer,
    product: productReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    wishlist: wishlistReducer,
    historyUser: historyUserReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
