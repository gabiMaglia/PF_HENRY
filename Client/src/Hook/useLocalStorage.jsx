import { useState } from "react";

export function useLocalStorage() {
  const [storedProducts, setStoredProducts] = useState(() => {
    try {
      const products = window.localStorage.getItem("storedProducts");
      return products ? JSON.parse(products) : [];
    } catch (error) {
      return [];
    }
  });

  const addProductToCart = (product) => {
    try {
      setStoredProducts((prevProducts) => {
        const productId = product.id;
        const existingProductIndex = prevProducts.findIndex(
          (p) => p.id === productId
        );

        if (existingProductIndex !== -1) {
          const updatedProducts = [...prevProducts];
          updatedProducts[existingProductIndex].count += 1;
          window.localStorage.setItem(
            "storedProducts",
            JSON.stringify(updatedProducts)
          );
          return updatedProducts;
        } else {
          const newProduct = {
            ...product,
            count: 1,
          };
          const newProducts = [...prevProducts, newProduct];
          window.localStorage.setItem(
            "storedProducts",
            JSON.stringify(newProducts)
          );
          return newProducts;
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateProductCount = (productId, newCount) => {
    try {
      setStoredProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) =>
          product.id === productId
            ? { ...product, count: Math.max(1, newCount) }
            : product
        );

        window.localStorage.setItem(
          "storedProducts",
          JSON.stringify(updatedProducts)
        );

        return updatedProducts;
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getProducts = () => {
    return storedProducts || [];
  };

  return [getProducts, addProductToCart, updateProductCount];
}
