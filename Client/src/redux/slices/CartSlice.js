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
  },
});

export const { addItem } = cartSlice.actions;


export default cartSlice.reducer;
