import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
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
    totalItem: (state, action) => {
      const totalPrice = state.items.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.price * currentItem.count,
        0
      );
      state.total = totalPrice;
    }
  },
});

export const { addItem, updateItem, removeItem, totalItem } = cartSlice.actions;

export default cartSlice.reducer;
