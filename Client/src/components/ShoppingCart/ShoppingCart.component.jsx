//HOOKS
import { useEffect, useState } from "react";
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
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

//REDUX
import {
  addItem,
  updateItem,
  removeItem,
  totalItem,
} from "../../redux/slices/cartSlice";
//SERVICES
import {
  fetchCart,
  fetchCount,
  fetchDelete,
  fetchGetProduct,
} from "../../services/productServices";

export default function ShoppingCart() {
  const dispatch = useDispatch();

  const { items, total, id } = useSelector((state) => state.cart);
  console.log(items);

  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: "es-AR" });

  useEffect(() => {
    dispatch(addItem());
    // if (items.length == 0) {
    //   dispatch(fetchGetProduct());
    // }
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

  const handleChange = (productId, value) => {
    const newValue = parseInt(value) || 1;
    dispatch(updateItem({ id: productId, count: newValue }));
    dispatch(fetchCount({ id: productId, count: newValue }));
  };

  const handleIncrement = (productId) => {
    const currentCount = items.find((item) => item.id === productId).count;
    dispatch(
      updateItem({
        id: productId,
        count: Math.min(currentCount + 1, 10),
      })
    );
  };

  const handleDecrement = (productId) => {
    const currentCount = items.find((item) => item.id === productId).count;
    dispatch(
      updateItem({ id: productId, count: Math.max(currentCount - 1, 1) })
    );
  };

  const handleDelete = (product) => {
    dispatch(removeItem(product));
    dispatch(fetchDelete(product));
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

            <BaseNumberInput
              min={1}
              max={10}
              id={item.id}
              value={item.count}
              onChange={(event, value) => handleChange(item.id, value)}
              slots={{
                root: StyledInputRoot,
                input: StyledInput,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
              }}
              slotProps={{
                incrementButton: {
                  children: (
                    <AddIcon
                      fontSize="small"
                      onClick={() => handleIncrement(item.id)}
                    />
                  ),
                  className: "increment",
                },
                decrementButton: {
                  children: (
                    <RemoveIcon
                      fontSize="small"
                      onClick={() => handleDecrement(item.id)}
                    />
                  ),
                },
              }}
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

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
