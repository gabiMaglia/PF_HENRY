import { useSelector } from "react-redux";
import { useLocalStorage } from "../../Hook/useLocalStorage";
import CardProduct from "../ProductCard/ProductCard.component";
import { Box, Button, Container, Typography } from "@mui/material";

const ProductBox = ({ products }) => {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const { productsToShow } = useSelector((state) => state.product);

  const isThereAnyProducts = productsToShow.length === 0;

  const handleAddToCart = (product) => {
    // Agrega el producto al carrito
    setCartItems([...cartItems, product]);
    console.log("Producto agregado al carrito:", product);
  };

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: { md: "repeat(1,1fr)", lg: "repeat(3,1fr)" },
        flexDirection: "row",
        gap: 1,
        mt: 2,
      }}
    >
      {isThereAnyProducts ? (
        <Typography>
          No se encontro ningun producto relacionado con su busqueda
        </Typography>
      ) : (
        products.map((product) => (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            key={product.id}
          >
            <CardProduct product={product} />
            <Button
              variant="contained"
              sx={{
                maxWidth: 270,
                backgroundColor: "#fd611a",
                color: "black",
                transition: "transform 0.3s",
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
