import axios from "axios";
const url = "http://localhost:3001";

export const getAllProducts = async () => {
  try {
    const AllProducts = await axios.get(`${url}/product/`);
    return AllProducts;
  } catch (error) {
    return { error: error.message };
  }
};

export const getProductById = async () => {
  try {
    const byId = await axios.get(`${url}/product/:id`);
    return byId;
  } catch (error) {
    return { error: error.message };
  }
};

export const postProduct = async () => {
  try {
    const newProduct = await axios.post(`${url}/product/`);
    return newProduct;
  } catch (error) {
    return { error: error.message };
  }
};

export const updateProduct = async () => {
  try {
    const updatedProduct = await axios.put(`${url}/product/:id`);
    return updatedProduct;
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteProduct = async () => {
  try {
    const deletedProduct = await axios.delete(`${url}/product/:id`);
    return deletedProduct;
  } catch (error) {
    return { error: error.message };
  }
};
