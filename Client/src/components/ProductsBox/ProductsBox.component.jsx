import { useSelector, useDispatch } from "react-redux";
// import { useLocalStorage } from "../../Hook/useLocalStorage";
import CardProduct from "../ProductCard/ProductCard.component";
import { Box, Button, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../redux/slices/CartSlice";

const ProductBox = ({ products }) => {
  const dispatch = useDispatch();
  // const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const { productsToShow } = useSelector((state) => state.product);

  const isThereAnyProducts = productsToShow.length === 0;
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    // Agrega el producto al carrito
    dispatch(addItem(product));
    console.log("Producto agregado al carrito:", product);
    navigate("/shoppingcart");
  };

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: { md: "repeat(1,1fr)", lg: "repeat(3,1fr)" },
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
