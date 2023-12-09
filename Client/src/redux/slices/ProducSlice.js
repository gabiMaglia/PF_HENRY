import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3001"

const initialState = {
    products: [],
    allProducts: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
reducers:{
    getProducts: (state, action) => {
        state.allProducts = action.payload
        state.products = action.payload
    }
}
})
      
export const {getProducts} = productSlice.actions;

export default productSlice.reducer;

export const fechAllProducts = () => (dispatch) =>{
    axios.get(`${url}/product/`)
    .then((response) => {
        dispatch(getProducts(response.data))
    }).catch((error) => console.log(error))
}
