import React from "react";
import HomeCard from "../HomeProduct/HomeProduct.component";
import { Container, Typography } from "@mui/material";

const HomeProducts = ({ allProducts }) => {
  // Tomar los primeros 6 productos
  const homeProducts = allProducts.slice(0, 6);

  return (
    <Container>
      <Typography paddingLeft={8} margin={2} fontWeight={"bold"}>
        ÚLTIMAS NOVEDADES
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 5,
          gap: 1,
        }}
      >
        {homeProducts.map((product) => (
          <HomeCard key={product.id} product={product} />
        ))}
      </Container>
    </Container>
  );
};

export default HomeProducts;
