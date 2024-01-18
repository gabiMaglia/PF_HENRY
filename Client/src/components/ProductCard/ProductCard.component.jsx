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
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDesired, setIsDesired] = useState(false);
  const wishlistProducts = useSelector((state) => state.wishlist.products);
  const login = useSelector((state) => state.user.login);
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const userId = authData ? authData.userId : null;
  const userRole = authData ? authData.userRole : null;
  console.log(product.ProductStock);
  const { id, name, price, ProductImages, ProductCategories, ProductStock } =
    product;

  const formatPrice = (price) => {
    return "$" + price.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  };

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

  const handleDesiredClick = () => {
    if (login && userRole === "customer") {
      fetchAddItemWish(dispatch, userId, product.id, authData.jwt);
    } else if (login && userRole !== "customer") {
      Swal.fire({
        icon: "info",
        title: "Acceso Denegado",
        text: "Tu rol de usuario no posee lista de deseos.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Acceso Privado",
        text: "Debe registrarse para añadir a la lista de deseos.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    if (login) {
      if (wishlistProducts) {
        const isProductInWishlist = wishlistProducts.some((p) => p.id === id);
        setIsDesired(isProductInWishlist);
      } else {
        fetchWishList(userId, dispatch, authData.jwt);
      }
    } else {
      setIsDesired(false);
    }
  }, [userId, dispatch, login, wishlistProducts]);

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
              className="hover-underline-animation-dark"
              variant="subtitle2"
              onClick={handleCategoryClick}
              sx={{
                paddingTop: "20px",
                zIndex: "999",
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
              cursor: login ? "pointer" : "not-allowed",
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
                sx={{
                  fontSize: "20px",
                  marginTop: "-20px",
                  lineHeight: "1.2",
                  maxHeight: "2.4em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  "-webkit-line-clamp": 2,
                }}
              >
                {name}
              </Typography>
            </CardContent>
            {ProductStock.amount < 5 && ProductStock.amount > 1 && (
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  color: "red",
                  fontWeight: 700,
                }}
              >
                Quedan {ProductStock.amount} unidades disponibles!
              </Typography>
            )}
            {ProductStock.amount === 0 && (
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red",
                  fontWeight: 700,
                }}
              >
                Producto sin stock!
              </Typography>
            )}
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
