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
  search,
} from "../redux/slices/productSlice";
//SWEET ALERT
import Swal from "sweetalert2";


const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/product/`);
    const filteredProducts = response.data.filter(
      (product) => product.is_deleted === false
    );
    dispatch(getProducts(filteredProducts));
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

    if (filteredProducts.length == 0) {
     await Swal.fire({
        icon: "error",
        title: "No se encontro coincidencias en la busqueda",
        text: "Error en la busqueda",
        confirmButtonColor: "#fd611a",
        confirmButtonText: "Ok",})
    } else {
      dispatch(search(filteredProducts));
    }
  } catch (error) {
    console.log("error catch", error);
  }
};

export const fetchChage = (inputValue) => async (dispatch) => {
  try {
    dispatch(changeInput(inputValue));
  } catch (error) {
    return;
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
    const response = await axios.put(
      `${urlBack}/product/logicalDelete/${id}`,
      null,
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

export const addToCarouselProduct = async (id, jwt) => {
  try {
    const response = await axios.put(
      `${urlBack}/product/addToCarousel/${id}`,
      null,
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

// export const fetchProductsByOrder = (order) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${urlBack}/order?price=${order}`);
//     dispatch(orderPrice(response.data));
//   } catch (error) {
//     console.error("Error al buscar productos por marca:", error);
//   }
// };
