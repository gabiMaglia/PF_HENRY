import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  CardMedia,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, cartItem } from "../../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useLocalStorage } from "../../Hook/useLocalStorage";

// Este componente representa un carrito de compras cuyo estado se almacena en el localStorage y se actualiza mediante
// eventos de cambio.
export default function ShoppingCart() {
  // Se utiliza el hook useLocalStorage para manejar el estado de una variable llamada text.
  // El estado inicial de text es obtenido del almacenamiento local localStorage utilizando la clave 'text'.
  // Si no hay ningún valor almacenado para 'text', se utiliza el valor por defecto una cadena vacía.
  // Cuando se llama a esta función, se obtiene el nuevo valor del texto del evento (event.target.value)
  // y se actualiza el estado de text utilizando la función setText.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  console.log(items, "items");

  useEffect(() => {
    dispatch(addItem());
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: "es-AR" });
  }, []);

  const ProductMedia = styled(CardMedia)({
    padding: 24,
    height: 200,
    width: 200,
    objectFit: "cover",
    margin: "auto",
  });

  if (items.length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Container xs={{ display: "flex", flexDirection: "column" }}>
      <Typography component="h2">Cart Items:</Typography>
      <Box display="flex" flexDirection="column">
        {items.map((item) => (
          <Box key={item.id} display="flex" flexDirection="row">
            <ProductMedia
              component="img"
              alt={item.name}
              src={item.ProductImages[0].address}
            />
            <Typography>{item.name}</Typography>
            <Typography>Precio: ${item.price * item.count}</Typography>
            <TextField
              label="Cantidad"
              variant="outlined"
              type="number"
              value={item.count}
            />
          </Box>
        ))}
      </Box>
      <Wallet initialization={{ preferenceId: "" }} />
    </Container>
  );
}
