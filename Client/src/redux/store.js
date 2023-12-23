import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cookiesReducer from './slices/cookiesSlice'
import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/CartSlice";
import categoriesReducer from "./slices/CategoriesSlice";
import wishlistReducer from "./slices/WishListSlice";

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
