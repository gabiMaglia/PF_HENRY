//AXIOS
import axios from "axios";
//UTILS
import { getBrands } from "../redux/slices/brandsSlice";
import Swal from "sweetalert2";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchBrands = async (dispatch) => {
  try {
    const { data } = await axios.get(`${urlBack}/brand/`, {
      withCredentials: true,
    });
    dispatch(getBrands(data));
  } catch (error) {
    Swal.fire({
      allowOutsideClick: false,
      icon: "error",
      title: "Error al obtener las marcas de los productos",
    });
  }
};
