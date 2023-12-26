//HOOKS
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//MATERIAL UI
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
//COMPONENTS
import ProductCard from "../ProductCard/ProductCard.component";
//HOOK
import { useLocalStorage } from "../../Hook/UseLocalStorage";
//REDUX
import { addItem } from "../../redux/slices/cartSlice";

const ProductBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [storedProducts, setStoredProducts] = useLocalStorage();
  const { productsToShow, isLoading } = useSelector((state) => state.product);

  const [animationComplete, setAnimationComplete] = useState(false);

  const isThereAnyProducts = productsToShow.length === 0;

  const handleAddToCart = (product) => {
    setStoredProducts(product);
    dispatch(addItem());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000); // Puedes ajustar el tiempo de la animación

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading || !animationComplete) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "space-around",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <CircularProgress
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: 5,
            color: "#fd611a",
          }}
        />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Cargando...
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: { md: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" },
        flexDirection: "row",
        gap: 4,
        mt: 2,
      }}
    >
      {isThereAnyProducts ? (
        <Typography
          sx={{
            display: "grid",
            gridColumnStart: 1,
            gridColumnEnd: 4,
            alignItems: "center",
            fontSize: 18,
            fontWeight: 700,
            color: "red",
          }}
        >
          No se encontró ningún producto relacionado con su búsqueda.
        </Typography>
      ) : (
        productsToShow.map((product, index) => (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            key={product.id}
          >
            <ProductCardWithFade product={product} index={index} />
            <Button
              variant="contained"
              sx={{
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
              onClick={() => handleAddToCart(product)}
            >
              AGREGAR AL CARRITO
            </Button>
          </Box>
        ))
      )}
    </Container>
  );
};

const ProductCardWithFade = ({ product, index }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1);
    }, index * 200); // Puedes ajustar el tiempo de la animación

    return () => {
      clearTimeout(fadeInTimeout);
    };
  }, [index]);

  return (
    <Box
      style={{
        opacity: opacity,
        transition: "opacity 0.5s ease-in",
      }}
    >
      <ProductCard product={product} />
    </Box>
  );
};

export default ProductBox;
