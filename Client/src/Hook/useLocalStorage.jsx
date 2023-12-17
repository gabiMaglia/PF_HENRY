// import { useState } from "react";

// // Este enlace simplifica el proceso de administración del estado en un componente de React mientras persiste ese
// // estado en el almacenamiento local del navegador.
// export function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     // UseState: inicializa el estado (storedValue) con el
//     // resultado de una función.
//     try {
//       const item = window.localStorage.getItem(key);
//       //Si el valor existe, se analiza desde JSON; de lo contrario, se utiliza initialValue.
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       return initialValue;
//     }
//   });
//   // Esta funcion, actualiza el estado del componente storedValue con el nuevo valor usando setStoredValue.
//   const setValue = (value) => {
//     try {
//       setStoredValue(value);
//       // Almacena el nuevo valor en el almacenamiento local del navegador utilizando el archivo key.
//       // El valor se codifica en JSON antes del almacenamiento.
//       window.localStorage.setItem(key, JSON.stringify(value));
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   return [storedValue, setValue]; // devuelve una matriz que contiene el estado actual storedValue y la función setValue.
// }

// import { useState } from "react";

// export function useLocalStorage() {
//   const [storedValues, setStoredValues] = useState(() => {
//     try {
//       const items = window.localStorage.getItem("counters");
//       return items ? JSON.parse(items) : {};
//     } catch (error) {
//       return {};
//     }
//   });

//   const setCounter = (itemId, count) => {
//     try {
//       setStoredValues((prevValues) => {
//         const newValues = { ...prevValues, [itemId]: count };
//         window.localStorage.setItem("counters", JSON.stringify(newValues));
//         return newValues;
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const getCounter = (itemId) => {
//     return storedValues[itemId] || 0;
//   };

//   return [getCounter, setCounter];
// }

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
