import axios from "axios";
const url = import.meta.env.VITE_BACK_URL;

export const GetAllProduct = async () => {
    try {
        const GetProduct = await axios.get(`${url}/product/`);
        return GetProduct;
      } catch ({ GetProduct }) {
        return { error: GetProduct };
      }
}

export const GetById = async () => {
    try {
        const GetId = await axios.get(`${url}/product/:id`);
        return GetId;
      } catch ({ GetId }) {
        return { error: GetId };
      }
}


export const PostProduct = async () => {
    try {
        const PostProd = await axios.post(`${url}/product/`);
        return PostProd;
      } catch ({ PostProd }) {
        return { error: PostProd };
      }
}


export const PutProduct = async () => {
    try {
        const PutProduct = await axios.put(`${url}/product/:id`);
        return PutProduct;
      } catch ({ PutProduct }) {
        return { error: PutProduct };
      }
}

export const DeleteProduct = async () => {
    try {
        const Delete = await axios.delete(`${url}/product/:id`)
        return Delete
    } catch ({Delete}) {
        return { error: Delete };
    }
}

export const getBrandProducts = async () => {
    try {
        const searchProduct = await axios.get(`${url}/brand/filter/:name`)
        return searchProduct
    } catch ({searchProduct}) {
        return { error: searchProduct };
    }
}