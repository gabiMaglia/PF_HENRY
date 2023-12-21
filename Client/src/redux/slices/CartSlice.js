import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addItemsToCart = createAsyncThunk(
  "cart/addItems",
  async (items, { dispatch }) => {
    return items;
  }
);

const initialState = {
  items: [],
  total: 0,
  id: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const storedProducts = JSON.parse(
        window.localStorage.getItem("storedProducts")
      );

      if (storedProducts) {
        const uniqueProducts = storedProducts.filter(
          (product) => !state.items.some((item) => item.id === product.id)
        );
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
        window.localStorage.setItem(
          "storedProducts",
          JSON.stringify(updatedProducts)
        );
      }
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== productIdToRemove);
      window.localStorage.setItem(
        "storedProducts",
        JSON.stringify(state.items)
      );
    },
    totalItem: (state, action) => {
      const totalPrice = state.items.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.price * currentItem.count,
        0
      );
      state.total = totalPrice;
    },
  },
  extraReducers: (builder) => {
    // Maneja la acción asyncThunk para agregar productos al carrito
    builder.addCase(addItemsToCart.fulfilled, (state, action) => {
      state.items = [...state.items, ...action.payload];
    });
  },
  idShop: (state, action) => {
    state.id = action.payload
    console.log(action.payload, "id")
  }

});

export const { addItem, updateItem, removeItem, totalItem, idShop } = cartSlice.actions;

export default cartSlice.reducer;

