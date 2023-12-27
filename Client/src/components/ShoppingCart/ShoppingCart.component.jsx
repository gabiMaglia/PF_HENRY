//HOOKS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
//MATERIAL UI
import {
  Container,
  Box,
  Typography,
  CardMedia,
  styled,
  Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import QuantityInput from "./InputCount.component";
//REDUX
import {
  addItem,
  updateItem,
  removeItem,
  totalItem,
} from "../../redux/slices/cartSlice";
//SERVICES
import { fetchCart, fetchGetProduct } from "../../services/productServices";

export default function ShoppingCart() {
  const dispatch = useDispatch();

  const { items, total, id } = useSelector((state) => state.cart);

  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: "es-AR" });

  useEffect(() => {
    dispatch(addItem());
  }, [dispatch]);

  useEffect(() => {
    dispatch(totalItem());
  }, [items]);

  const ProductMedia = styled(CardMedia)({
    padding: 5,
    height: 140,
    width: 140,
    objectFit: "cover",
  });

  if (items.length == 0) {
    return (
      <Typography sx={{ mt: 10 }} component="h2">
        No hay productos en el carrito
      </Typography>
    );
  }

  const handleChange = (product, newValue) => {
    // const newQuantity = parseInt(event.target.value, 10) || 1;

    dispatch(updateItem({ id: product.id, count: newValue }));
  };

  const handleDelete = (product) => {
    dispatch(removeItem(product));
  };

  const handleShop = (e) => {
    dispatch(fetchCart(items));
  };

  return (
    <Container display="flex" sx={{ flexDirection: "column", mt: 10 }}>
      <Typography display="flex" component="h2" sx={{ fontSize: 30, mb: 5 }}>
        Carrito de Compras
      </Typography>
      <Box display="flex" flexDirection="column">
        {items.map((item) => (
          <Box
            key={item.id}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ mb: 4 }}
          >
            <ProductMedia
              component="img"
              alt={item.name}
              src={item.ProductImages.address}
            />
            <Typography>{item.name}</Typography>
            <QuantityInput
              id={item.id}
              value={item.count}
              onChange={(newValue) => handleChange(item, newValue)}
            />
            <Typography>Precio: ${item.price * item.count}</Typography>
            <Button onClick={() => handleDelete(item.id)}>
              <DeleteForeverIcon />
            </Button>
          </Box>
        ))}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography sx={{ mr: 8 }}>Total: ${total}</Typography>
          <Button
            onClick={handleShop}
            sx={{
              mr: 10,
              maxWidth: 270,
              backgroundColor: "#fd611a",
              color: "black",
              transition: "transform 0.3s",
              marginTop: "10px",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#fd611a",
                color: "white",
              },
            }}
          >
            Comprar
          </Button>
        </Box>
      </Box>
      {id && <Wallet initialization={{ preferenceId: id }} />}
    </Container>
  );
}
