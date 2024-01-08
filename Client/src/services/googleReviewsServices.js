import axios from "axios";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const googleReviewsServices = async () => {
  try {
    const { data } = await axios.get(`${urlBack}/places/google-reviews`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error al pedir las reseñas", error);
    throw error;
  }
};
