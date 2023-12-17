import axios from "axios";
import { getCategories } from "../redux/slices/CategoriesSlice";

const urlBack = import.meta.env.VITE_BACKEND_URL;

export const fetchCategories = async (dispatch) => {
    try {
        const { data } = await axios.get(`${urlBack}/category/`);
        dispatch(getCategories(data));
    } catch (error) {
        console.log( error, "Error al obtener las categorias" );
    }
}

