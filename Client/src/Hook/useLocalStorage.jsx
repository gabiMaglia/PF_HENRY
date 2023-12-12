import { useState } from "react";

// Este enlace simplifica el proceso de administración del estado en un componente de React mientras persiste ese
// estado en el almacenamiento local del navegador.
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    // UseState: inicializa el estado (storedValue) con el
    // resultado de una función.
    try {
      const item = window.localStorage.getItem(key);
      //Si el valor existe, se analiza desde JSON; de lo contrario, se utiliza initialValue.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  // Esta funcion, actualiza el estado del componente storedValue con el nuevo valor usando setStoredValue.
  const setValue = (value) => {
    try {
      setStoredValue(value);
      // Almacena el nuevo valor en el almacenamiento local del navegador utilizando el archivo key.
      // El valor se codifica en JSON antes del almacenamiento.
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };
  return [storedValue, setValue]; // devuelve una matriz que contiene el estado actual storedValue y la función setValue.
}
