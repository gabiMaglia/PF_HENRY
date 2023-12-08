import React from "react";
import { TextField } from "@mui/material";
import { useLocalStorage } from "../../Hook/useLocalStorage";

export default function ShoppingCart() {
  const [text, setText] = useLocalStorage("text", "");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <TextField
      label="Shopping Cart" // Se proporciona un texto descriptivo sobre el propósito del campo.
      multiline // Utilizamos multiline para permitir múltiples líneas en el TextField
      rows={4}
      variant="outlined" // borde alrededor del campo de texto.
      fullWidth
      value={text}
      onChange={handleTextChange}
    />
  );
}
