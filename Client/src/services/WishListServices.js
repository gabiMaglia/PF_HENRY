import axios from "axios";
import Swal from "sweetalert2";
import {
  getWishlist,
  addProductToWishlist,
} from "../redux/slices/WishListSlice";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchWishList = async (userId, dispatch) => {
  try {
    const response = await axios.get(`${urlBack}/wishlist/${userId}`);
    if (response.data) {
      dispatch(getWishlist(response.data.Products));
    } else {
      throw new Error("No se pudo obtener la lista de deseos");
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

export const fetchAddItemWish = async (dispatch, userId, productId) => {
  const request = {
    userID: userId,
    productID: productId,
  };
  try {
    const {data} = await axios.post(`${urlBack}/wishlist`, request);
    if (data) {
        dispatch(addProductToWishlist(data.Products));
    } else {
      throw new Error("No se pudo añadir el producto a la lista de deseos");
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};
