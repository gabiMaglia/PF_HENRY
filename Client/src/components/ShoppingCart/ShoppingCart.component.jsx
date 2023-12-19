import React, { useEffect } from "react";
import {
  TextField,
  Container,
  Box,
  Typography,
  CardMedia,
  styled,
  Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  updateItem,
  removeItem,
  totalItem,
} from "../../redux/slices/CartSlice";

// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export default function ShoppingCart() {
  const dispatch = useDispatch();

  const { items, total } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(addItem());
    // initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: "es-AR" });
  }, []);

  useEffect(() => {
    dispatch(totalItem());
  }, [items]);

  console.log(items);
  const ProductMedia = styled(CardMedia)({
    padding: 24,
    height: 200,
    width: 200,
    objectFit: "cover",
    margin: "auto",
  });

  if (items.length === 0) {
    return (
      <Typography component="h2">No hay productos en el carrito</Typography>
    );
  }

  const handleChange = (product, event) => {
    console.log(product, "cant");
    const newQuantity = parseInt(event.target.value, 10) || 1;

    dispatch(updateItem({ id: product.id, count: newQuantity }));
  };

  const handleDelete = (product) => {
    dispatch(removeItem(product));
  };

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
              id={item.id}
              label="Cantidad"
              variant="outlined"
              type="number"
              value={item.count}
              onChange={(e) => handleChange(item, e)}
            />
            <Button onClick={() => handleDelete(item.id)}>
              <DeleteForeverIcon />
            </Button>
          </Box>
        ))}
        <Typography>Total: ${total}</Typography>
      </Box>
      {/* <Wallet initialization={{ preferenceId: "" }} /> */}
    </Container>
  );
}
