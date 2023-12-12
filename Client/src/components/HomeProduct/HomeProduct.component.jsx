import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ProductCard = styled(Card)({
  width: 300,
  height: 350,
  margin: 0,
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
  padding: 24,
  height: 200,
  width: 200,
  objectFit: "cover",
  margin: "auto",
});

const ProductPrice = styled(Typography)({
  color: "#fd611a",
  fontWeight: "bold",
  marginTop: "auto",
  marginBottom: 24,
  fontSize: 28,
});

const HomeProduct = ({ product }) => {
  const { id, name, price, ProductImages } = product;

  const imageUrl =
    ProductImages[0].address && ProductImages[0].address.length > 0
      ? ProductImages[0].address
      : null;

  return (
    <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
      <ProductCard
        sx={{
          display: "flex",
          padding: 0,
          m: 1,
          cursor: "pointer",
        }}
      >
        <ProductMedia component="img" alt={name} src={imageUrl} />
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
    </Link>
  );
};

export default HomeProduct;
