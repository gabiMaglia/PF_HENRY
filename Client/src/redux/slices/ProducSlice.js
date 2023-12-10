import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3001";

const initialState = {
  products: [],
  allProducts: [],
  productById: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.allProducts = action.payload;
      state.products = action.payload;
    },
    getProductById: (state, action) => {
      state.productById = action.payload;
    },
    search: (state, action) => {
        state.products = action.payload;
    }
  },
});

export const { getProducts, getProductById, search } = productSlice.actions;

export default productSlice.reducer;

export const fechAllProducts = () => (dispatch) => {
  axios
    .get(`${url}/product/`)
    .then((response) => {
      dispatch(getProducts(response.data));
    })
    .catch((error) => console.log(error));
};

export const fetchProductById = (id) => (dispatch) => {
  axios
    .get(`${url}/product/${id}`)
    .then((response) => {
      console.log("Response from fetchProductById:", response.data);
      dispatch(getProductById(response.data));
    })
    .catch((error) => {
      console.error("Error fetching product by ID:", error);
    });
};

export const fechSearch = (name) => (dispatch) => {
    axios
      .get(`${url}/search?name=${name}`)
      .then((response) => {
        dispatch(search(response.data));
      })
      .catch((error) => console.log(error));
  };