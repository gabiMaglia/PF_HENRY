import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/CartSlice";
import categoriesReducer from "./slices/CategoriesSlice";
import wishlistReducer from "./slices/WishListSlice";

import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    categories: categoriesReducer,
    wishlist: wishlistReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
