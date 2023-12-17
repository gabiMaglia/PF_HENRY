import React from "react";
import { TextField, Button } from "@mui/material";
// import { useLocalStorage } from "../../Hook/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  checkout,
  selectCartItems,
} from "../../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";

// Este componente representa un carrito de compras cuyo estado se almacena en el localStorage y se actualiza mediante
// eventos de cambio.
export default function ShoppingCart() {
  // Se utiliza el hook useLocalStorage para manejar el estado de una variable llamada text.
  // El estado inicial de text es obtenido del almacenamiento local localStorage utilizando la clave 'text'.
  // Si no hay ningún valor almacenado para 'text', se utiliza el valor por defecto una cadena vacía.
  const [text, setText] = React.useState("");
  // Cuando se llama a esta función, se obtiene el nuevo valor del texto del evento (event.target.value)
  // y se actualiza el estado de text utilizando la función setText.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAddToCart = () => {
    const newProduct = {
      id: cartItems.length + 1,
      name: text,
      price: 10,
    };

    dispatch(addItem(newProduct));
    setText("");
  };

  const [saveToLocal, setSaveToLocal] = React.useState(false);

  const handleCheckout = () => {
    dispatch(checkout());
    navigate("/shoppingcart");
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <TextField
        label="Shopping Cart"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleTextChange}
      />
      <Button onClick={handleAddToCart} variant="contained" color="primary">
        Add to Cart
      </Button>
      <Button onClick={handleCheckout} variant="contained" color="primary">
        Checkout
      </Button>
      <div>
        <h2>Cart Items:</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
