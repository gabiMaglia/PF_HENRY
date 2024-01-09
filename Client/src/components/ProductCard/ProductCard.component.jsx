//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//MATREIAL UI
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import { styled } from "@mui/system";
import BookmarkIcon from "@mui/icons-material/Bookmark";
//REDUX
import {
  fetchAddItemWish,
  fetchWishList,
} from "../../services/wishListServices";
//UTILS
import { getAuthDataCookie } from "../../utils/cookiesFunctions";

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
  fontSize: 24,
});

const CardProduct = ({ product }) => {
  const authData = getAuthDataCookie("authData");
  const userId = authData ? authData.userId : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDesired, setIsDesired] = useState(false);
  const { id, name, price, ProductImages, ProductCategories } = product;
  const wishlistProducts = useSelector((state) => state.wishlist.products);
  const login = useSelector((state) => state.user.login);

  const formatPrice = (price) => {
    return "$" + price.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  };

  useEffect(() => {
    if (login && wishlistProducts) {
      const isProductInWishlist = wishlistProducts.some((p) => p.id === id);
      setIsDesired(isProductInWishlist);
    } else {
      setIsDesired(false);
    }
  }, [wishlistProducts, id, login]);

  useEffect(() => {
    if (login && !wishlistProducts) {
      fetchWishList(userId, dispatch, authData.jwt);
    }
  }, [userId, dispatch, login, wishlistProducts]);

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

  const handleDesiredClick = (e) => {
    e.stopPropagation();
    if (login) {
      fetchAddItemWish(dispatch, userId, product.id, authData.jwt);
    } else {
      Swal.fire("Error", "debe registrarse para añadir a la lista de deseos");
    }
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
              sx={{
                paddingTop: "20px",
                zIndex: "1000",
                borderBottom: "1px solid black",
              }}
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
            onClick={handleDesiredClick}
            sx={{
              cursor: login ? null : "not-allowed",
              position: "relative",
              top: "20px",
              right: "-30px",
              transform: "translateY(-50%)",
              color: isDesired ? "#fd611a" : "gray",
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
                sx={{ fontSize: "18px", marginTop: "-20px" }}
              >
                {name}
              </Typography>
            </CardContent>
            <ProductPrice
              variant="subtitle1"
              align="center"
              sx={{ fontWeight: "900" }}
            >
              {formatPrice(price)}
            </ProductPrice>
          </Box>
        </Link>
      </ProductCard>
    </>
  );
};

export default CardProduct;
