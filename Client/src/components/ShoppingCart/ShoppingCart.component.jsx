import React from "react";
import { TextField } from "@mui/material";
import { useLocalStorage } from "../../Hook/useLocalStorage";

// Este componente representa un carrito de compras cuyo estado se almacena en el localStorage y se actualiza mediante
// eventos de cambio.
export default function ShoppingCart() {
  // Se utiliza el hook useLocalStorage para manejar el estado de una variable llamada text.
  // El estado inicial de text es obtenido del almacenamiento local localStorage utilizando la clave 'text'.
  // Si no hay ningún valor almacenado para 'text', se utiliza el valor por defecto una cadena vacía.
  const [text, setText] = useLocalStorage("text", "");
  // Cuando se llama a esta función, se obtiene el nuevo valor del texto del evento (event.target.value)
  // y se actualiza el estado de text utilizando la función setText.
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <TextField
      label="Shopping Cart" // Se proporciona un texto descriptivo sobre el propósito del campo.
      multiline // Utilizamos multiline para permitir múltiples líneas en el TextField.
      rows={4}
      variant="outlined" // borde alrededor del campo de texto.
      fullWidth
      value={text}
      onChange={handleTextChange}
    />
  );
}
