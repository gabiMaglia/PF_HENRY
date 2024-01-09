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
import { idShop, getCart } from "../redux/slices/cartSlice";
//SWEET ALERT
import Swal from "sweetalert2";
import { getDataFromSelectedPersistanceMethod } from "../utils/authMethodSpliter";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/product/`, {
      withCredentials: true,
    });
    const filteredProducts = response.data.filter(
      (product) => product.is_deleted === false
    );
    dispatch(getProducts(filteredProducts));
    // dispatch(getProducts(response.data));
  } catch (error) {
    return;
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/product/${id}`, {
      withCredentials: true,
    });
    dispatch(getProductById(response.data));
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

export const fetchSearch = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/search?name=${name}`, {
      withCredentials: true,
    });
    const filteredProducts = response.data.filter(
      (product) => product.is_deleted === false
    );
    dispatch(getProducts(filteredProducts));
    // dispatch(search(response.data));
  } catch (error) {
    Swal.fire("Producto no existente", "", "error");
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/category/filter/${category}`, {
      withCredentials: true,
    });
    dispatch(filterByCategory(response.data));
  } catch (error) {
    console.error("Error al buscar productos por categoría:", error);
  }
};

export const fetchProductsByBrand = (brand) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/brand/filter/${brand}`, {
      withCredentials: true,
    });
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

export const fetchProduct = (product, cookiesAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);
  const { userId } = aux;
  const user = window.localStorage.getItem("userId");
  const { id } = product;
  const data = {
    userId: userId ? userId : user,
    productId: id,
    productQuantity: 1,
  };

  try {
    const res = await axios.post(`${urlBack}/cart/`, data, {
      withCredentials: true,
    });

    if (res.data.Cart === "El usuario ya tiene carrito") {
      const response = await axios.put(`${urlBack}/cart/add`, data, {
        withCredentials: true,
      });
    }
  } catch (error) {
    return;
  }
};

export const fetchGetProduct = ({cookiesAccepted}) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);

  const { userId, userRole } = aux;
  if (userRole === "customer") {
    try {
      const res = await axios.get(`${urlBack}/cart/${userId}`, {
        withCredentials: true,
      });
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
  }
};

export const fetchCount = (product, cookiesAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);
  const { userId } = aux;
  const data = {
    userId: userId,
    productId: product.id,
    productQuantity: product.count,
  };
  try {
    const response = await axios.put(`${urlBack}/cart/edit`, data, {
      withCredentials: true,
    });
  } catch (error) {
    return;
  }
};

export const fetchDelete = (product, cookiesAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);
  const { userId } = aux;
  const data = {
    userId: userId,
    productId: product,
  };
  try {
    const res = await axios.put(`${urlBack}/cart/remove`, data, {
      withCredentials: true,
    });
  } catch (error) {
    return;
  }
};

export const fetchCart = (items, cookieAccepted) => async (dispatch) => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted);
  const { userId } = aux;
  const products = items.map((item) => ({
    title: item.name,
    quantity: item.count,
    unit_price: item.price,
    currency_id: "ARS",
  }));
  try {
    const response = await axios.post(
      `${urlBack}/pagos/order`,
      { array: products, userId: userId },
      { withCredentials: true },
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
    const { data } = await axios.post(`${urlBack}/product`, obj, {
      withCredentials: true,
    });
    if (data) {
      dispatch(addProduct(data.product));
    }
  } catch (error) {
    return;
  }
};

export const logicalDeleteProduct = async (id) => {
  try {
    const response = await axios.put(`${urlBack}/product/logicalDelete/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const fetchUpdateProduct = async (id, updateProduct) => {
  try {
    const response = await axios.put(
      `${urlBack}/product/${id}`,
      updateProduct,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const fetchCartUser = (cookieAccepted) => async (dispatch) => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted);
  const { userId } = aux;

  try {
    const response = await axios.get(`${urlBack}/pagos/misCompras/${userId}`, {
      withCredentials: true
    })
    dispatch(getCart(response.data))
  } catch (error) {
    console.log(error.message)
  }
}

// export const fetchProductsByOrder = (order) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${urlBack}/order?price=${order}`);
//     dispatch(orderPrice(response.data));
//   } catch (error) {
//     console.error("Error al buscar productos por marca:", error);
//   }
// };
