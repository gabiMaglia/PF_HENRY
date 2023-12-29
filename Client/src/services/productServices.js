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
  addProduct,
} from "../redux/slices/productSlice";

//REDUX
<<<<<<< HEAD
import { addItem, idShop } from "../redux/slices/cartSlice";
<<<<<<< HEAD
=======
import { useLocalStorage } from "../Hook/useLocalStorage";
>>>>>>> develop
=======
import { idShop } from "../redux/slices/cartSlice";
>>>>>>> develop
//SWEET ALERT
import Swal from "sweetalert2";
import { getDataFromSelectedPersistanceMethod } from "../utils/authMethodSpliter";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/product/`, {
      withCredentials: true,
    });
    dispatch(getProducts(response.data));
  } catch (error) {
    return;
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
    return;
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

export const fetchProduct = (product, cookieAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted)
  const {userId} = aux
  const user = window.localStorage.getItem("userId");
  const { id } = product;
  const data = {
    userId: userId? userId : user,
    productId: id,
    productQuantity: 1,
  };

  try {
    const res = await axios.post(`${urlBack}/cart/`, data);

    if (res.data.Cart === "El usuario ya tiene carrito") {
      const response = await axios.put(`${urlBack}/cart/add`, data);
    }
  } catch (error) {
    return;
  }
};

export const fetchGetProduct = (cookieAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted)
  const {userId} = aux
  try {
    const res = await axios.get(`${urlBack}/cart/${userId}`);

    const products = res.data.Products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      ProductImages: product.ProductImages[0],
      count: product.ProductCart.quantity,
    }));

    const storedProducts = getProducts();

    if (storedProducts.payload === undefined) {
      window.localStorage.setItem("storedProducts", JSON.stringify(products));
    }
  } catch (error) {
    return;
  }
};

export const fetchCount = (product, cookieAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted)
  const {userId} = aux

  const data = {
    userId: userId,
    productId: product.id,
    productQuantity: product.count,
  };
  try {
    const response = await axios.put(`${urlBack}/cart/edit`, data);
  } catch (error) {
    return;
  }
};

export const fetchDelete = (product, cookieAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted)
  const {userId} = aux

  const data = {
    userId: userId,
    productId: product,
  };
  try {
    const res = await axios.put(`${urlBack}/cart/remove`, data);
    console.log(res, "delete");
  } catch (error) {
    return;
  }
};

export const fetchCart = (items, cookieAccepted) => async (dispatch) => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted)
  const {userId} = aux
  
  const products = items.map((item) => ({
    title: item.name,
    quantity: item.count,
    unit_price: item.price * item.count,
    currency_id: "ARS",
  }));
  console.log(products);
  try {
    const response = await axios.post(
      `${urlBack}/pagos/order`,
      { array: products, userId: userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(idShop(response.data.Order.preferenceId));
  } catch (error) {
    return;
  }
};
export const fetchAddProduct = async (obj, dispatch) => {
  try {
    const { data } = await axios.post(`${urlBack}/product`, obj);
    if (data) {
      dispatch(addProduct(data.product));
    }
  } catch (error) {
    return;
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