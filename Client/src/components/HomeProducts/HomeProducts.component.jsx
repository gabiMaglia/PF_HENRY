import React from "react";
import HomeCard from "../HomeProduct/HomeProduct.component";
import { Container, Typography } from "@mui/material";

const HomeProducts = ({ products }) => {
  const limitedProducts = products.slice(0, 8);

  return (
    <Container
      sx={{
        marginBottom: 40,
        gap: 16,
        paddingTop: 2,
        flexDirection: "column",
      }}
    >
      <Typography
        fontWeight={"bold"}
        fontSize={24}
        paddingTop={0}
        paddingLeft={2}
        marginBottom={2}
      >
        ÚLTIMAS NOVEDADES
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {limitedProducts.map((product) => (
          <HomeCard key={product.id} product={product} />
        ))}
      </Container>
    </Container>
  );
};

export default HomeProducts;
