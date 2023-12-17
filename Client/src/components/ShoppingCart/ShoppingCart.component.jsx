import React, { useEffect } from "react";
import {
  TextField,
  Container,
  Box,
  Typography,
  CardMedia,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/CartSlice";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export default function ShoppingCart() {
  const dispatch = useDispatch();

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
