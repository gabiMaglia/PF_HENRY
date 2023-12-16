//HOOKS
import { Link, useNavigate } from "react-router-dom";
//MATREIAL UI
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
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
  const navigate = useNavigate();
  const { id, name, price, ProductImages, ProductCategories } = product;

  const categoryName =
    ProductCategories[0].name && ProductCategories[0].name.length > 0
      ? ProductCategories[0].name
      : null;

  const imageUrl =
    ProductImages[0].address && ProductImages[0].address.length > 0
      ? ProductImages[0].address
      : null;

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    navigate(`/products/filters/${categoryName}`);
  };

  return (
    <>
      <ProductCard
        sx={{
          display: "flex",
          padding: 0,
          m: 1,
          cursor: "pointer",
        }}
      >
        {categoryName && (
          <Typography
            variant="subtitle2"
            onClick={handleCategoryClick}
            sx={{ paddingTop: "20px", zIndex: "1000" }}
          >
            <span
              style={{
                fontWeight: "700",
                color: "#fd611a",
                textTransform: "uppercase",
              }}
            >
              categoria:
            </span>{" "}
            {categoryName}
          </Typography>
        )}
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <Box>
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
            <ProductPrice
              variant="subtitle1"
              align="center"
              sx={{ fontWeight: "900" }}
            >
              ${price}
            </ProductPrice>
          </Box>
        </Link>
      </ProductCard>
    </>
  );
};

export default CardProduct;
