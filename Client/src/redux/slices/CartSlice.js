import { createSlice } from "@reduxjs/toolkit";

// este código define un slice llamado "cart" con un estado inicial que tiene una propiedad items.
// Proporciona dos acciones (addItem y checkout) para modificar el estado, un selector (selectItems) para acceder
// a la propiedad items del estado, y exporta el reducer asociado al slice.

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
