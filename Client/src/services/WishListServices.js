import axios from "axios";
import Swal from "sweetalert2";
import {
  getWishlist,
  addProductToWishlist,
} from "../redux/slices/WishListSlice";
const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchWishList = async (id, dispatch) => {
  try {
    const { data } = await axios.get(`${urlBack}/wishlist/${id}`);
    const list = data.products;
    dispatch(getWishlist(list));
  } catch (error) {
    Swal.fire(error);
  }
};
export const fetchAddItemWish = async (dispatch, userId, productId) => {
  const request = {
    userID: userId,
    productID: productId,
  };
  try {
    const { data } = await axios.post(`${urlBack}/wishlist`, request);
    const list = data.products;
    dispatch(addProductToWishlist(list));
    dispatch(getWishlist(list));
  } catch (error) {
    Swal.fire(error.message);
  }
};
