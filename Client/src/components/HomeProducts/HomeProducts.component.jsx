import React from "react";
import HomeCard from "../HomeProduct/HomeProduct.component";
import { Container } from "@mui/material";

const HomeProducts = ({ products }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 5,
        gap: 1,
      }}
    >
      {products.map((product) => (
        <HomeCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default HomeProducts;
