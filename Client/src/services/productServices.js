//AXIOS
import axios from "axios";
//UTILS
import {
  search,
  getProductById,
  getProducts,
  filterByCategory,
  filterByBrand,
  changeInput,
} from "../redux/slices/productSlice";
//REDUX
import { idShop } from "../redux/slices/CartSlice";
//SWEET ALERT
import Swal from "sweetalert2";
import { headerSetterForPetitions } from "../utils/authMethodSpliter";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchAllProducts = () => async (dispatch) => {

  try {
    const cookieStatus = JSON.parse(window.localStorage.getItem('cookieAccepted'))
    
    const axiosInstance = cookieStatus
      ? headerSetterForPetitions(cookieStatus)
      : headerSetterForPetitions(cookieStatus)(
          window.localStorage.getItem("jwt")
        );
    const response = await axiosInstance.get(`${urlBack}/product/`);
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
    Swal.fire("Producto no existente", "", "error");
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
    dispatch(changeInput(inputValue));
  } catch (error) {
    console.log("error");
  }
};

// export const fetchCart = (items) => async (dispatch) => {
//  const products = items.map((item) => ({
//       title: item.name,
//       quantity: item.count,
//       unit_price: item.price * item.count,
//       currency_id: "ARS"
//     }));
//   try {
//     const response = await axios.post(`${urlBack}/pagos`, products, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//   });
//     dispatch(idShop(response.data))
//   } catch (error) {
//     console.error("no mando el response", error);
//   }
// };

export const fetchProduct = (product) => async () => {
  const user = window.localStorage.getItem("userId")
  const {id} = product
  const data = {
    userId: user,
    productId: id,
    productQuantity: 1,
  }
  console.log(data)
  try {
    const res = await axios.post(`${urlBack}/cart/`, data)
    console.log(res, "se cargo el producto")
    if(res.data.Cart === 'El usuario ya tiene carrito'){
      const response = await axios.put(`${urlBack}/cart/add`, data)
      console.log(response, "el mensaje put")
    }
  } catch (error) {
    console.error("error", error);
  }
}

export const fetchGetProduct = () => async () => {
  const user = window.localStorage.getItem("userId")
  try {
    const res = await axios.get(`${urlBack}/cart/${user}`)
    console.log(res, "product")
  } catch (error) {
    console.error("error", error);
  }
} 


export const fetchCart = (items) => async (dispatch) => {
  const id = window.localStorage.getItem("userId")
  console.log(id)
  const products = items.map((item) => ({
      title: item.name,
      quantity: item.count,
      unit_price: item.price * item.count,
      currency_id: "ARS"
    }));
    console.log(products)
  try {
    const response = await axios.post(`${urlBack}/pagos/order`, {array: products, userId: id}, {
      headers: {
        'Content-Type': 'application/json'
      }
  });
    dispatch(idShop(response.data.Order.preferenceId))
  } catch (error) {
    console.error("error", error);
  }
};



// export const fetchProductsByOrder = (order) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${urlBack}/order?price=${order}`);
//     dispatch(orderPrice(response.data));
//   } catch (error) {
//     console.error("Error al buscar productos por marca:", error);
//   }
// };
