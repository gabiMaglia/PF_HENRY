//AXIOS
import axios from 'axios';
//UTILS
import { getBrands } from "../redux/slices/brandsSlice"

const urlBack = import.meta.env.VITE_BACKEND_URL;


export const fetchBrands = async (dispatch) => {
    try {
        const { data } = await axios.get(`${urlBack}/brand/`, {
            withCredentials: true,
        });
        dispatch(getBrands(data));
    } catch (error) {
        console.log(error, "Error al obtener las marcas");
    }
}
