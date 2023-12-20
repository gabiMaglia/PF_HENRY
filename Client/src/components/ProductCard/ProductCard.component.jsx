//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//MATREIAL UI
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import {
  fetchAddItemWish,
  fetchWishList,
} from "../../services/WishListServices";
//WISHLIST
import { getAuthDataCookie } from "../../utils/cookiesFunctions";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const ProductCard = styled(Card)({
  width: 300,
  height: 350,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { id, name, price, ProductImages, ProductCategories } = product;
  const wishlistProducts = useSelector((state) => state.wishlist.products);
  const login = useSelector((state) => state.user.login);
  const { userId } = getAuthDataCookie("authData");
  if (login) {
    console.log(wishlistProducts);
    if (userId) {
      useEffect(() => {
        const isProductInWishlist = wishlistProducts.some((p) => p.id === id);
        setIsFavorite(isProductInWishlist);
      }, [wishlistProducts, id]);
      
      useEffect(() => {
        fetchWishList(userId, dispatch);
      }, []);
    }
  }

  const categoryName =
    ProductCategories && ProductCategories.length > 0
      ? ProductCategories[0].name
      : null;

  const imageUrl =
    ProductImages && ProductImages.length > 0 ? ProductImages[0].address : null;

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    navigate(`/products/filters/${categoryName}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    // setIsFavorite(!isFavorite);
    fetchAddItemWish(dispatch, userId, product.id);
  };

  return (
    <>
      <ProductCard
        sx={{
          m: 1,
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
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
          <BookmarkIcon
            onClick={handleFavoriteClick}
            sx={{
              position: "relative",
              top: "20px",
              right: "-30px",
              transform: "translateY(-50%)",
              color: isFavorite ? "#fd611a" : "gray",
            }}
          />
        </Box>
        <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
          <Box>
            <ProductMedia
              component="img"
              alt={name}
              src={imageUrl}
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
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
