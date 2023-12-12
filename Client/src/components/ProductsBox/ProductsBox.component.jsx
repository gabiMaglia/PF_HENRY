import { useLocalStorage } from "../../Hook/useLocalStorage";
import HomeProduct from "../HomeProduct/HomeProduct.component";
import { Box, Button, Container } from "@mui/material";

const ProductBox = ({ products, currentPage, productsPerPage }) => {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const startIndex = (currentPage - 1) * productsPerPage;

  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

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
      {currentProducts.map((product) => (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          key={product.id}
        >
          <HomeProduct product={product} />
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
      ))}
    </Container>
  );
};

export default ProductBox;
