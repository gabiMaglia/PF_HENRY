import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductsBackup: [],
  allProducts: [],
  productsToShow: [],
  productById: {},
  filteredProductsByCategory: [],
  filteredProductsByBrand: [],
  inputName:"",
  totalPages: 0,
  currentPage: 0,
};

const PRODUCT_PER_PAGE = 12;
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.allProductsBackup = action.payload;
      state.allProducts = action.payload;
      state.productsToShow = action.payload.slice(0, PRODUCT_PER_PAGE);
      state.totalPages = Math.ceil(action.payload.length/PRODUCT_PER_PAGE);
    },
    getProductById: (state, action) => {
      state.productById = action.payload;
    },
     nextPage: (state, action) => {
      const nextPage = state.currentPage + 1;
      if (nextPage >= state.totalPages) {
        const startIndex = 0;
        const endIndex = PRODUCT_PER_PAGE;
     state.currentPage = 0
     state.productsToShow = state.allProducts.slice(startIndex, endIndex)
    }else {
        const startIndex = nextPage * PRODUCT_PER_PAGE;
        const endIndex = startIndex + PRODUCT_PER_PAGE;
        state.currentPage= nextPage
        state.productsToShow= state.allProducts.slice(startIndex, endIndex) 
      }},
    prevPage: (state, action) => {
      const prevPage = state.currentPage - 1;
      if (prevPage >= 0) {
        const startIndex = prevPage * PRODUCT_PER_PAGE;
        const endIndex = startIndex + PRODUCT_PER_PAGE;
        state.currentPage = state.currentPage - 1
        state.productsToShow = state.allProducts.slice(startIndex, endIndex)
        }else {
        const lastPage = state.totalPages - 1;
        const startIndex = lastPage * PRODUCT_PER_PAGE;
        const endIndex = startIndex + PRODUCT_PER_PAGE;
        state.currentPage= lastPage
        state.productsToShow= state.allProducts.slice(startIndex, endIndex)
        
      }},
    search: (state, action) => {
      state.productsToShow = action.payload;
      state.inputName = "";
      state.currentPage= 0
      state.totalPages = Math.ceil(action.payload.length/PRODUCT_PER_PAGE);
    },
    changeInput: (state, action) => {
      state.inputName = action.payload
    },
    orderPrice: (state, action) => {
      const prodOrder = state.productsToShow;
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
      state.productsToShow = prodSort;
    },
      filterByCategory: (state, action) => {
        const categoryName = action.payload;
        state.productsToShow = state.allProducts.filter(
            (product) => product.ProductCategories[0].name === categoryName
          );
          state.allProductsBackup = state.productsToShow
          state.currentPage= 0
          state.totalPages = Math.ceil(state.productsToShow.length/9); 
        
      },
    filterByBrand: (state, action) => {
      const brandName = action.payload;
      state.productsToShow = state.allProductsBackup.filter(
          (product) => product.ProductBrands[0].name === brandName
        ); 
        state.currentPage= 0
        state.totalPages = Math.ceil(state.productsToShow.length/9); 
    },
    
    resetState: (state, action) => {
      state.allProductsBackup= state.allProducts
      state.productsToShow = state.allProductsBackup.slice(0, PRODUCT_PER_PAGE);
      state.totalPages = Math.ceil(state.allProductsBackup.length/PRODUCT_PER_PAGE);
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
  resetState,
  prevPage,
  nextPage,
} = productSlice.actions;

export default productSlice.reducer;

