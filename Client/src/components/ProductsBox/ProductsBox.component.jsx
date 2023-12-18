//HOOKS
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../Hook/useLocalStorage";
//MATERIAL UI
import { Box, Button, Container, Typography } from "@mui/material";
//COMPONENTS
import ProductCard from "../ProductCard/ProductCard.component";

const ProductBox = () => {
  const navigate = useNavigate();
  const [storedProducts, setStoredProducts] = useLocalStorage();
  const { productsToShow } = useSelector((state) => state.product);
  const isThereAnyProducts = productsToShow.length === 0;

  const handleAddToCart = (product) => {
    // Agrega el producto al carrito
    setStoredProducts(product);
    console.log("Producto agregado al carrito:", product);
    navigate("/shoppingcart");
  };

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
          No se encontro ningun producto relacionado con su busqueda
        </Typography>
      ) : (
        productsToShow.map((product) => (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            key={product.id}
          >
            <ProductCard product={product} />
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

export default ProductBox;
