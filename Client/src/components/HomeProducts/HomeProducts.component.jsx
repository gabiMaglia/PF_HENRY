import React from "react";
import CardProduct from "../ProductCard/ProductCard.component";
import { Container, Typography } from "@mui/material";

const HomeProducts = ({ allProducts }) => {
  // Tomar los primeros 6 productos
  const homeProducts = allProducts.slice(0, 6);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Typography paddingLeft={8} margin={2} fontWeight={"bold"} fontSize={24}>
        ÚLTIMAS NOVEDADES
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginBottom: 5,
          gap: 1,
          [`@media (max-width:1100px)`]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {homeProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </Container>
    </Container>
  );
};

export default HomeProducts;
