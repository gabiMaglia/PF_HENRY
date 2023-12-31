//HOOKS
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProductsBackup: [],
  allProducts: [],
  productsToShow: [],
  allProductsTotal: [],
  productById: {},
  filteredProductsByCategory: [],
  filteredProductsByBrand: [],
  inputName: "",
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
      state.allProductsTotal = action.payload;
      state.productsToShow = action.payload.slice(0, PRODUCT_PER_PAGE);
      state.totalPages = Math.ceil(action.payload.length / PRODUCT_PER_PAGE);
    },
    getProductById: (state, action) => {
      state.productById = action.payload;
    },
    selectPage: (state, action) => { 
      const pagina = action.payload - 1;
      const startIndex = pagina * PRODUCT_PER_PAGE;
      const endIndex = startIndex + PRODUCT_PER_PAGE
      state.currentPage = pagina
      state.productsToShow = state.allProducts.slice(startIndex, endIndex);
    },
    search: (state, action) => {
      state.productsToShow = action.payload;
      state.inputName = "";
      state.currentPage = 0;
      state.totalPages = Math.ceil(action.payload.length / PRODUCT_PER_PAGE);
    },
    changeInput: (state, action) => {
      state.inputName = action.payload;
    },
    orderPrice: (state, action) => {
      const prodOrder = state.productsToShow;
      const prodSort =
        action.payload == "desc"
          ? prodOrder.sort((a, b) => {
              if (a.price < b.price) return 1;
              if (a.price > b.price) return -1;
            })
          : action.payload == "asc"
          ? prodOrder.sort((a, b) => {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
            })
          : prodOrder;
      state.productsToShow = prodSort;
      state.currentPage = 0;
      state.totalPages = Math.ceil(prodSort.length / PRODUCT_PER_PAGE);
    },
    filterByCategory: (state, action) => {
      const categoryName = action.payload;
      const filterCate = state.allProductsBackup.filter(
        (product) => product.ProductCategories[0].name === categoryName
      );
      state.currentPage = 0;
      state.allProducts = filterCate
      state.totalPages = Math.ceil(filterCate.length / PRODUCT_PER_PAGE);
      state.productsToShow = filterCate.slice(0, PRODUCT_PER_PAGE) 
    },
    filterByBrand: (state, action) => {
      const brandName = action.payload;
  
      const filterBrand = state.allProducts.filter(
        (product) => product.ProductBrands[0].name === brandName
      );
      
      if(filterBrand.length === 0){
        
       const filterBrand2 = state.allProductsBackup.filter(
          (product) => product.ProductBrands[0].name === brandName
        )
        state.currentPage = 0;
      state.totalPages = Math.ceil(
        filterBrand2.length / PRODUCT_PER_PAGE
      );
      state.productsToShow = filterBrand2.slice(0, PRODUCT_PER_PAGE)
      }else{
      state.currentPage = 0;
      state.totalPages = Math.ceil(
        filterBrand.length / PRODUCT_PER_PAGE
      );
      state.productsToShow = filterBrand.slice(0, PRODUCT_PER_PAGE)}
    },
    resetState: (state, action) => {
      state.allProductsBackup = state.allProductsTotal;
      state.productsToShow = state.allProductsTotal.slice(0, PRODUCT_PER_PAGE);
      state.totalPages = Math.ceil(
        state.allProductsBackup.length / PRODUCT_PER_PAGE
      );
      state.inputName = "";
    },
    addProduct: (state, action) => {
      state.allProducts = [...state.allProducts, action.payload];
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
  addProduct,
  selectPage
} = productSlice.actions;

export default productSlice.reducer;
