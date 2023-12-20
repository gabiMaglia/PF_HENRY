import axios from "axios";
import Swal from "sweetalert2";
import { search, getProductById, getProducts, filterByCategory, filterByBrand, changeInput, orderPrice } from "../redux/slices/ProductSlice";

const urlBack = import.meta.env.VITE_BACKEND_URL;

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
    Swal.fire("Producto no existente", '', 'error')
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/category/filter/${category}`);
    dispatch(filterByCategory(response.data));
    console.log(response.data, "catego")
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

export const fetchProductsByOrder = (order) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/order?price=${order}`);
    dispatch(orderPrice(response.data));
  } catch (error) {
    console.error("Error al buscar productos por marca:", error);
  }
};