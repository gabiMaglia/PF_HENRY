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
      state.items = Object.values(storedProducts).map((product) => ({ ...product }));
    },
    updateItem: (state, action) => {
      const { id, count } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
    
      if (itemIndex !== -1) {
        // Update the count in the Redux state
        state.items[itemIndex].count = count;
    
        // Update the count in local storage
        const updatedProducts = [...state.items];
        window.localStorage.setItem("storedProducts", JSON.stringify(updatedProducts));
      }
    }
  },
});

export const { addItem, updateItem } = cartSlice.actions;


export default cartSlice.reducer;
