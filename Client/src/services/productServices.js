//AXIOS
import axios from "axios";
//UTILS
import {
  getProductById,
  getProducts,
  filterByCategory,
  filterByBrand,
  changeInput,
  addProduct,
} from "../redux/slices/productSlice";
//FIREBASE ANALYTICS
import { getAnalytics, logEvent } from "firebase/analytics";
//REDUX
import { idShop, getCart } from "../redux/slices/cartSlice";
//SWEET ALERT
import Swal from "sweetalert2";
import { getDataFromSelectedPersistanceMethod } from "../utils/authMethodSpliter";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/product/`);
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
    const response = await axios.get(`${urlBack}/product/${id}`);
    dispatch(getProductById(response.data));
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

export const fetchSearch = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/search?name=${name}`);
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

export const fetchProduct = (product, cookiesAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);
  const { userId, jwt } = aux;
  const { id } = product;
  const data = {
    userId: userId,
    productId: id,
    productQuantity: 1,
  };
  // Envio de notificaciónes a FIREBASE
  const firebaseParams = {
    currency: "ARS",
    value: product?.name,
    items: [
      {
        item_id: product?.id,
        item_name: product?.name,
        item_category: product?.ProductCategories[0]?.name,
        price: product?.price,
      },
    ],
  };
  const analytics = getAnalytics();
  logEvent(analytics, "add_to_cart", firebaseParams);
  console.log(
    product?.id,
    product?.name,
    product?.ProductCategories[0]?.name,
    product?.price
  );

  try {
    const res = await axios.post(`${urlBack}/cart/`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (res.data.Cart === "El usuario ya tiene carrito") {
      await axios.put(`${urlBack}/cart/add`, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }
  } catch (error) {
    return;
  }
};

export const fetchGetProduct =
  ({ cookiesAccepted }) =>
  async () => {
    const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);
    const { userId, userRole, jwt } = aux;
    if (userRole === "customer") {
      try {
        const res = await axios.get(`${urlBack}/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
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
          window.localStorage.setItem(
            "storedProducts",
            JSON.stringify(products)
          );
        }
      } catch (error) {
        return;
      }
    }
  };

export const fetchCount = (product, cookiesAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);

  const { userId, jwt } = aux;

  const data = {
    userId: userId,
    productId: product.id,
    productQuantity: product.count,
  };
  try {
    await axios.put(`${urlBack}/cart/edit`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    return;
  }
};

export const fetchDelete = (product, cookiesAccepted) => async () => {
  const aux = getDataFromSelectedPersistanceMethod(cookiesAccepted);
  const { userId, jwt } = aux;
  const data = {
    userId: userId,
    productId: product,
  };
  try {
    await axios.put(`${urlBack}/cart/remove`, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    return;
  }
};

export const fetchCart = (items, cookieAccepted) => async (dispatch) => {
  const aux = getDataFromSelectedPersistanceMethod(cookieAccepted);
  const { userId, jwt } = aux;
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

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(idShop(response.data.Order.preferenceId));
  } catch (error) {
    return;
  }
};

export const fetchAddProduct = async (obj, dispatch, jwt) => {
  try {
    const { data } = await axios.post(`${urlBack}/product`, obj, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (data) {
      dispatch(addProduct(data.product));
    }
  } catch (error) {
    return;
  }
};

export const logicalDeleteProduct = async (id, jwt) => {
  try {
    const response = await axios.put(`${urlBack}/product/logicalDelete/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const fetchUpdateProduct = async (id, updateProduct, jwt) => {
  try {
    const response = await axios.put(
      `${urlBack}/product/${id}`,
      updateProduct,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const fetchCartUser =
  ({ cookieAccepted }) =>
  async (dispatch) => {
    const aux = getDataFromSelectedPersistanceMethod(cookieAccepted);
    const { userId } = aux;
    console.log(userId);
    try {
      const response = await axios.get(
        `${urlBack}/pagos/misCompras/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatch(getCart(response.data));
    } catch (error) {
      console.log(error.message);
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
