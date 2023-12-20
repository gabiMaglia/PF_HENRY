import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
console.log(initialState)
const WishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    getWishlist(state, action) {
      state.products = action.payload;
      
    },
    addProductToWishlist(state, action) {
        state.products = action.payload;

    },
  },
});

export const { getWishlist,addProductToWishlist } = WishListSlice.actions;
export default WishListSlice.reducer;
