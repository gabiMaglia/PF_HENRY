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
      if(storedProducts){
      state.items = Object.values(storedProducts).map((product) => ({ ...product }));
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
    }
  },
});

export const { addItem, updateItem } = cartSlice.actions;


export default cartSlice.reducer;
