//HOOKS
import { Link } from "react-router-dom";
//MATREIAL UI
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
  height: 180,
  width: 180,
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

const CardProduct = ({ product }) => {
  const { id, name, price, ProductImages, ProductCategories } = product;

  const categoryName =
    ProductCategories[0].name && ProductCategories[0].name.length > 0
      ? ProductCategories[0].name
      : null;

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
        {categoryName && (
          <Typography variant="subtitle2" sx={{ paddingTop: "20px" }}>
            <span style={{ fontWeight: "700", color: "#fd611a", textTransform: "uppercase" }}>
              categoria:
            </span>{" "}
            {categoryName}
          </Typography>
        )}
        <ProductMedia component="img" alt={name} src={imageUrl} />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            color="textPrimary"
            align="center"
            sx={{ marginTop: "-20px" }}
          >
            {name}
          </Typography>
        </CardContent>
        <ProductPrice variant="subtitle1" align="center" sx={{ fontWeight: "900" }}>
          ${price}
        </ProductPrice>
      </ProductCard>
    </Link>
  );
};

export default CardProduct;
