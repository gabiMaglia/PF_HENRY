import { createSlice } from "@reduxjs/toolkit";


// este código define un slice llamado "cart" con un estado inicial que tiene una propiedad items.
// Proporciona dos acciones (addItem y checkout) para modificar el estado, un selector (selectItems) para acceder
// a la propiedad items del estado, y exporta el reducer asociado al slice.

const initialState = {
  items: [],
  backItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const storedProducts = JSON.parse(window.localStorage.getItem("storedProducts"));
      // Convert the storedProducts object to an array
      state.items = Object.values(storedProducts).map((product) => ({ ...product }));
    },
    cartItem: (state, action) => { 
    },
  },
});

export const { addItem, cartItem } = cartSlice.actions;


export default cartSlice.reducer;
