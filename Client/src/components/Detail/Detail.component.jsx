import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Divider,
  Container,
  Button,
  useMediaQuery,
  styled,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../redux/slices/ProductSlice";
import CarouselProducts from "../CarouselProducts/CarouselProducts.component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addItem } from "../../redux/slices/CartSlice";
import {
  fetchProductById,
  fetchAllProducts,
} from "../../services/ProductServices";

const CustomButton = styled(Button)({
  backgroundColor: "#fd611a",
  color: "white",
  "&:hover": {
    backgroundColor: "#cc4c14",
  },
});

const ProductMedia = styled(CardMedia)({
  padding: 10,
  height: 200,
  width: 200,
  objectFit: "cover",
  margin: "auto",
});

const ThumbnailContainer = styled(Container)({
  border: "1px solid #ddd",
  boxShadow: "2px 2px 2px #888888",
  borderRadius: "4px",
  margin: "4px",
  cursor: "pointer",
  "&:hover": {
    border: "1px solid #fd611a",
  },
});

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productById, isLoading } = useSelector((state) => state.product);
  const [cartItems, setCartItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const { allProducts } = useSelector((state) => state.product);

  const cartItemCount = useSelector((state) => state.cart.items.length);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProductById(id));
      } catch (error) {}
    };

    const fetchDataAsync = async () => {
      dispatch(resetState());

      try {
        if (id && id !== productById?.id) {
          await fetchData();
        }
      } catch (error) {
        console.error("Error in fetchDataAsync:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [dispatch, id, productById]);

  useEffect(() => {
    const setInitialImage = () => {
      if (
        productById &&
        productById.ProductImages &&
        productById.ProductImages.length > 0
      ) {
        setSelectedImage(productById.ProductImages[0].address);
      }
    };

    setInitialImage();
  }, [productById]);

  const handleAddToCart = () => {
    if (productById && productById.id) {
      setCartItems([...cartItems, productById]);
      console.log("Product added to cart for ID:", productById.id);
      navigate("/shoppingcart");
      dispatch(addItem());
    }
  };

  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  if (loading || isLoading || !productById) {
    return (
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
        textAlign: isSmallScreen ? "center" : "left",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          boxShadow: "5px 5px 5px #888888",
          borderRadius: "8px",
          overflow: "hidden",
          margin: isSmallScreen ? "auto" : 0,
          maxWidth: isSmallScreen ? "100%" : 900,
        }}
      >
        {isLargeScreen &&
          productById.ProductImages &&
          productById.ProductImages.length > 1 && (
            <Container
              sx={{
                width: "100px",
                flexDirection: "column",
                spacing: 1,
              }}
            >
              {productById.ProductImages.map((image, index) => (
                <ThumbnailContainer
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => setSelectedImage(image.address)}
                >
                  <img
                    src={image.address}
                    alt={productById.name}
                    style={{ width: "80px", border: "1px solid transparent" }}
                  />
                </ThumbnailContainer>
              ))}
            </Container>
          )}

        <Container
          sx={{
            width: isSmallScreen ? "100%" : "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedImage && (
            <ProductMedia
              component="img"
              alt={productById.name}
              src={selectedImage}
              sx={{ height: "200px", maxWidth: "100%" }}
            />
          )}
        </Container>

        <Container
          sx={{
            padding: isLargeScreen ? "0 8px" : "8px",
            width: isSmallScreen ? "100%" : "auto",
          }}
        >
          <Box>
            <Typography
              fontSize={isSmallScreen ? 24 : isLargeScreen ? 24 : 21}
              fontWeight="bold"
              paddingTop={isLargeScreen ? 4 : 2}
            >
              {productById.name}
            </Typography>
            <Typography
              fontSize={isSmallScreen ? 24 : isLargeScreen ? 24 : 21}
              color="#fd611a"
              fontWeight="bold"
              paddingTop={isLargeScreen ? 4 : 2}
            >
              Precio: ${productById.price}
            </Typography>
          </Box>

          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 5,
              marginTop: 2,
            }}
          >
            <CustomButton
              variant="contained"
              size={isLargeScreen ? "large" : "small"}
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </CustomButton>
            {/* Muestra el contador de carrito */}
            {cartItemCount > 0 && (
              <span
                style={{
                  marginLeft: "0.5em",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0.2em 0.5em",
                  fontSize: "0.7em",
                }}
              >
                {cartItemCount}
              </span>
            )}
          </Container>
        </Container>
      </Container>
      <Container sx={{ marginTop: 2 }}>
        <Divider sx={{ marginY: 2 }} />
        <Typography fontSize={18} fontWeight={"bold"}>
          Descripción:
        </Typography>
        <Typography>{productById.description}</Typography>
      </Container>
      <Container>
        <Divider sx={{ marginY: 2 }} />
      </Container>
      <CarouselProducts allProducts={allProducts} />
    </Container>
  );
};

export default Detail;
