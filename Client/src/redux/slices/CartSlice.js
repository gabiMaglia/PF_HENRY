import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const storedProducts = JSON.parse(window.localStorage.getItem("storedProducts"));

      if (storedProducts) {
        const uniqueProducts = storedProducts.filter(product => !state.items.some(item => item.id === product.id));
        state.items = [...state.items, ...uniqueProducts];
      } else {
        state.items = [];
      }
    },
    updateItem: (state, action) => {
      const { id, count } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
    
      if (itemIndex !== -1) {
        
        state.items[itemIndex].count = count;
    
        const updatedProducts = [...state.items];
        window.localStorage.setItem("storedProducts", JSON.stringify(updatedProducts));
      }
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== productIdToRemove);
      window.localStorage.setItem("storedProducts", JSON.stringify(state.items));
    },
  },
});

export const { addItem, updateItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
