import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3001";

const initialState = {
  products: [],
  allProducts: [],
  productById: null,
  filteredProducts: [],
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
    },
    orderPrice: (state, action) => {
      const prodOrder = state.products;
      const prodSort =
        action.payload == "ascending"
          ? prodOrder.sort((a, b) => {
              if (a.price < b.price) return 1;
              if (a.price > b.price) return -1;
            })
          : action.payload == "descending"
          ? prodOrder.sort((a, b) => {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
            })
          : prodOrder;
      state.products = prodSort;
    },
    filterByCategory: (state, action) => {
      const categoryName = action.payload;

      console.log("Categoría seleccionada:", categoryName);
      if (categoryName === "all") {
        state.filteredProducts = state.allProducts;
      } else {
        console.log("Filtrando por categoría:", categoryName);
        state.filteredProducts = state.allProducts.filter(
          (product) => product.category === categoryName
        );
      }
    },
  },
});

export const {
  getProducts,
  getProductById,
  search,
  orderPrice,
  filterByCategory,
} = productSlice.actions;

export default productSlice.reducer;

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/product/`);
    dispatch(getProducts(response.data));
  } catch (error) {
    console.error("Error");
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/product/${id}`);
    dispatch(getProductById(response.data));
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

export const fetchSearch = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/search?name=${name}`);
    dispatch(search(response.data));
  } catch (error) {
    alert("Producto no existente");
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/category/filter/${category}`);
    dispatch(filterByCategory(response.data));
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
  }
};
