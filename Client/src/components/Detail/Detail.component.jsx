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
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../redux/slices/ProductSlice";
import { fetchProductById } from "../../services/ProductServices";

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
  const { productById, isLoading } = useSelector((state) => state.product);
  const [cartItems, setCartItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = async () => {
    try {
      console.log("Fetch product data...");
      await dispatch(fetchProductById(id));
      console.log("Product data");
    } catch (error) {
      console.log("Error fetch product:", error);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      console.log("fetchDataAsync...");
      await fetchData();
      console.log("fetchDataAsync completado.");
    };

    fetchDataAsync();

    return () => {
      console.log("Cleaning up...");
      dispatch(resetState());
      console.log("Cleanup completado.");
    };
  }, [dispatch, id]);

  useEffect(() => {
    const setInitialImage = () => {
      console.log("seteando imagen inicial");
      if (productById && productById.ProductImages) {
        setSelectedImage(productById.ProductImages[0].address);
      }
      console.log("imagen inicial seteada.");
    };

    setInitialImage();
  }, [productById]);

  const handleAddToCart = () => {
    setCartItems([...cartItems, productById]);
    console.log("Producto agregado al carrito:", productById);
  };

  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  if (isLoading || !productById) {
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
    </Container>
  );
};

export default Detail;
