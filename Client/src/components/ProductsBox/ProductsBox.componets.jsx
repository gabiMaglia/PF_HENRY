import HomeProduct from "../HomeProduct/HomeProduct.component";
import { Box, Button, Container } from "@mui/material";

const ProductBox = ({ products }) => {
  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: { md: "repeat(2,1fr)", lg: "repeat(4,1fr)" },
        flexDirection: "row",
        gap: 1,
      }}
    >
      {products.map((product) => (
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
          >
            AGREGAR AL CARRITO
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default ProductBox;
