import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  checkout,
  selectCartItems,
} from "../../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const [text, setText] = useState("");
  const [saveToLocal, setSaveToLocal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("Productos cargados al montar:", storedCartItems);
    if (storedCartItems.length > 0) {
      dispatch(checkout(storedCartItems));
    }
  }, [dispatch]);

  useEffect(() => {
    // Guardar datos en localStorage cada vez que el carrito se actualiza
    if (cartItems.length > 0 && saveToLocal) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, saveToLocal]);

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

    // Guardar en localStorage si saveToLocal es verdadero
    if (saveToLocal) {
      const localStorageCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      localStorageCartItems.push(newProduct);
      localStorage.setItem("cartItems", JSON.stringify(localStorageCartItems));
    }

    setText("");
  };

  const handleCheckout = () => {
    dispatch(checkout());

    // Actualizar el estado local del carrito al realizar el checkout
    if (cartItems.length > 0 && saveToLocal) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

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
      <label>
        Save to Local Storage
        <input
          type="checkbox"
          checked={saveToLocal}
          onChange={() => setSaveToLocal(!saveToLocal)}
        />
      </label>
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
