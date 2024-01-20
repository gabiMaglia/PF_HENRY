//AXIOS
import axios from "axios";
//UTILS
import {
  getWishlist,
  addProductToWishlist,
} from "../redux/slices/wishListSlice";
//SWEET ALERT
import Swal from "sweetalert2";
//FIREBASE
import { itemToWishlist } from "./firebaseAnayticsServices";
import { getDataFromSelectedPersistanceMethod } from "../utils/authMethodSpliter";

const urlBack = import.meta.env.VITE_BACKEND_URL;
const urlFront = import.meta.env.VITE_FRONT_URL;

export const fetchWishList = async (dispatch, cookieStatus) => {
  try {
    const {jwt, userId} = getDataFromSelectedPersistanceMethod(cookieStatus);
    const response = await axios.get(`${urlBack}/wishlist/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.data) {
      dispatch(getWishlist(response.data.Products));
    } else {
      throw new Error("No se pudo obtener la lista de deseos");
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

export const fetchAddItemWish = async (dispatch, productId, cookieStatus) => {
  const {jwt, userId} = getDataFromSelectedPersistanceMethod(cookieStatus);
  const request = {
    userID: userId,
    productID: productId,
  };
  try {
    const { data } = await axios.post(`${urlBack}/wishlist`, request, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (data) {
      dispatch(addProductToWishlist(data.Products));
      itemToWishlist(productId, data.Products, jwt);
    } else {
      throw new Error("No se pudo añadir el producto a la lista de deseos");
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

export const getOffers = async (cookieStatus) => {
  try {
    const {jwt, userId} = getDataFromSelectedPersistanceMethod(cookieStatus);
    const response = await axios.get(`${urlBack}/wishList/offer/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response };
  }
};
