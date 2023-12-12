import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const urlBack = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  products: [],
  allProducts: [],
  productById: {},
  filteredProductsByCategory: [],
  filteredProductsByBrand: [],
  inputName:"",
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
      state.inputName = "";
    },
    changeInput: (state, action) => {
      state.inputName = action.payload
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
      if (categoryName === "all") {
        state.filteredProductsByCategory = state.products;
      } else {
        state.filteredProductsByCategory = state.products.filter(
          (product) => product.ProductCategories[0].name === categoryName
        );
      }
    },
    filterByBrand: (state, action) => {
      const brandName = action.payload;
      if (brandName === "default") {
        state.filteredProductsByBrand = state.products;
      } else {
        state.filteredProductsByBrand = state.products.filter(
          (product) => product.ProductBrands[0].name === brandName
        );
      }
    },
    resetState: (state, action) => {
      state.products = state.allProducts;
      state.filteredProductsByCategory = [];
      state.filteredProductsByBrand = [];
      state.inputName = "";
    },
  },
});

export const {
  getProducts,
  getProductById,
  search,
  orderPrice,
  filterByCategory,
  filterByBrand,
  changeInput,
  resetState
} = productSlice.actions;

export default productSlice.reducer;

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/product/`);
    dispatch(getProducts(response.data));
  } catch (error) {
    console.error("Error");
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/product/${id}`);
    dispatch(getProductById(response.data));
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

export const fetchSearch = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/search?name=${name}`);
    dispatch(search(response.data));
  } catch (error) {
    alert("Producto no existente");
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/category/filter/${category}`);
    dispatch(filterByCategory(response.data));
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
  }
};

export const fetchProductsByBrand = (brand) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/brand/filter/${brand}`);
    dispatch(filterByBrand(response.data));
  } catch (error) {
    console.error("Error al buscar productos por marca:", error);
  }
};

export const fetchChage = (inputValue) => async (dispatch) => {
     try {
      dispatch(changeInput(inputValue))
     } catch (error) {
      console.log("error")
     }
}