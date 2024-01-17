import axios from "axios";
import {
  deleteHistoryItem,
  getHistoryUser,
  postHistoryUser,
} from "../redux/slices/historySlice";
import Swal from "sweetalert2";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchHistoryUSer = async (userId, dispatch) => {
  try {
    const { data } = await axios.get(`${urlBack}/history/${userId}`);
    if (data) {
      dispatch(getHistoryUser(data));
    } else {
      Swal.fire("Error", "no se pudo obtener el historial de usuario.");
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

export const fetchPostHistoryItem = async (userId, value, dispatch) => {
  try {
    const { data } = await axios.post(`${urlBack}/history/${userId}`, {
      value: value,
    });
    if (data.value) {
      dispatch(postHistoryUser(data.value));
    } else {
      Swal.fire("Error", "no se pudo añadir al historial.");
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};

export const fetchDeleteHistoryItem = async (userId, value, dispatch) => {
  try {
    console.log(userId,value)
    const { data } = await axios.put(`${urlBack}/history/${userId}`, {
      value: value,
    });
    if (data.value) {
      dispatch(deleteHistoryItem(data.value));
    } else {
      Swal.fire("Error", data.error.response);
    }
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
};
