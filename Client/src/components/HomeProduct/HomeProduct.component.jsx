import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ProductCard = styled(Card)({
  maxWidth: 270,
  maxHeight: 500,
  margin: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const ProductMedia = styled(CardMedia)({
  height: 150,
  width: 150,
  objectFit: "cover",
  margin: "auto",
});

const ProductPrice = styled(Typography)({
  color: "orange",
  fontWeight: "bold",
  marginTop: "auto",
});

const HomeProduct = ({ product }) => {
  const { name, price, image } = product;

  return (
    <ProductCard>
      <ProductMedia component="img" alt={name} src={image} />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          color="textPrimary"
          align="center"
        >
          {name}
        </Typography>
      </CardContent>
      <ProductPrice variant="subtitle1" align="center">
        ${price}
      </ProductPrice>
    </ProductCard>
  );
};

export default HomeProduct;
