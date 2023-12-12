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
import { fetchProductById } from "../../redux/slices/ProductSlice";

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

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productById, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const [cartItems, setCartItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (productById && productById.ProductImages) {
      setSelectedImage(productById.ProductImages[0].address);
    }
  }, [productById]);

  const handleAddToCart = () => {
    setCartItems([...cartItems, productById]);
    console.log("Producto agregado al carrito:", productById);
  };

  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const fontSizeName = isLargeScreen ? 32 : 24;
  const fontSizePrice = isLargeScreen ? 32 : 24;

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
        textAlign: isSmallScreen ? "center" : "left", // Alinea el contenido al centro en pantallas pequeñas
      }}
    >
      {/* Contenedor principal */}
      <Container
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          boxShadow: "5px 5px 5px #888888",
          borderRadius: "8px",
          overflow: "hidden",
          margin: isSmallScreen ? "auto" : 0, // Centra la card horizontalmente
          maxWidth: isSmallScreen ? "100%" : 900, // Establece un ancho máximo para la card
        }}
      >
        {/* Contenedor de imágenes en miniatura */}
        {isLargeScreen &&
          productById.ProductImages &&
          productById.ProductImages.length > 1 && (
            <Container
              sx={{
                width: isSmallScreen ? "100%" : "150px",
                flexDirection: "column",
                spacing: 1,
                display: isSmallScreen ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => handleImageChange(-1)}>{"<"}</Button>
              {productById.ProductImages.map((image, index) => (
                <Container
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={image.address}
                    alt={productById.name}
                    style={{ width: "120px", cursor: "pointer" }}
                    onClick={() => setSelectedImage(image.address)}
                  />
                </Container>
              ))}
              <Button onClick={() => handleImageChange(1)}>{">"}</Button>
            </Container>
          )}

        {/* Contenedor del visor de imágenes */}
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
              sx={{ height: "auto", maxWidth: "100%" }}
            />
          )}
        </Container>

        {/* Contenedor de información del producto */}
        <Container
          sx={{
            padding: isLargeScreen ? "0 8px" : "8px",
            width: isSmallScreen ? "100%" : "auto",
          }}
        >
          <Box>
            {/* Nombre del producto */}
            <Typography
              fontSize={isSmallScreen ? 24 : isLargeScreen ? 24 : 21} // Ajusta el tamaño del nombre
              fontWeight="bold"
              paddingTop={isLargeScreen ? 4 : 2}
            >
              {productById.name}
            </Typography>
            {/* Precio del producto */}
            <Typography
              fontSize={isSmallScreen ? 24 : isLargeScreen ? 24 : 21} // Ajusta el tamaño del precio
              color="#fd611a"
              fontWeight="bold"
              paddingTop={isLargeScreen ? 4 : 2} // Ajusta el paddingTOP del precio
            >
              Precio: ${productById.price}
            </Typography>
          </Box>

          {/* Botón de agregar al carrito */}
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
              size={isLargeScreen ? "large" : "small"} // Ajusta el tamaño del botón
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </CustomButton>
          </Container>
        </Container>
      </Container>

      {/* Contenedor de descripción */}
      <Container sx={{ marginTop: 2 }}>
        <Divider sx={{ marginY: 2 }} />
        <Typography fontSize={18} fontWeight={"bold"}>
          Descripción:
        </Typography>
        <Typography>{productById.description}</Typography>
      </Container>

      {/* Contenedor de garantía */}
      <Container>
        <Divider sx={{ marginY: 2 }} />
        {/* <Typography paddingBottom={5}>
          <strong>Garantía:</strong> {warranty.split("T")[0]}
        </Typography> */}
      </Container>
    </Container>
  );
};

export default Detail;
