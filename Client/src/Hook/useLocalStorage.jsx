import { useState } from "react";

export function useLocalStorage() {
  const [storedProducts, setStoredProducts] = useState(() => {
    try {
      const products = window.localStorage.getItem("storedProducts");
      return products ? JSON.parse(products) : {};
    } catch (error) {
      return {};
    }
  });

  const addProductToCart = (product) => {
    try {
      setStoredProducts((prevProducts) => {
        const productId = product.id;
        const currentProduct = prevProducts[productId] || {
          ...product,
          count: 0,
        };
        const newProduct = {
          ...currentProduct,
          count: currentProduct.count + 1,
        };
        const newProducts = { ...prevProducts, [productId]: newProduct };

        window.localStorage.setItem(
          "storedProducts",
          JSON.stringify(newProducts)
        );
        return newProducts;
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getProductDetails = (productId) => {
    return storedProducts[productId] || {};
  };

  return [getProductDetails, addProductToCart];
}
