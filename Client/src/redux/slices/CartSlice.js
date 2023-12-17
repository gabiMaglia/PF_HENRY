import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    checkout: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, checkout } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
