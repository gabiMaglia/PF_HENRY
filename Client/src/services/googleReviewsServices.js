import axios from "axios";
import Swal from "sweetalert2";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const googleReviewsServices = async () => {
  try {
    const { data } = await axios.get(`${urlBack}/places/google-reviews`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    Swal.fire({
      allowOutsideClick: false,
      icon: "error",
      title: "Error al pedir las reseñas",
      text: `${error}`,
    });
  }
};
