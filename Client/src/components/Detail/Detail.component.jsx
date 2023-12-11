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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../../redux/slices/ProducSlice";

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
  const { productById } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductById(id));
    };

    fetchData();
  }, [dispatch, id]);

  const { name, price, description, warranty, ProductImages } = productById;
  const [cartItems, setCartItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    ProductImages ? ProductImages[0].address : null
  );

  const handleAddToCart = () => {
    setCartItems([...cartItems, productById]);
    console.log("Producto agregado al carrito:", productById);
  };

  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const fontSizeName = isLargeScreen ? 32 : 24;
  const fontSizePrice = isLargeScreen ? 32 : 24;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          boxShadow: "5px 5px 5px #888888",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Miniaturas a la izquierda (mostrar solo en pantallas grandes) */}
        {isLargeScreen && (
          <Container
            sx={{
              width: "150px",
              flexDirection: "column",
              spacing: 1,
            }}
          >
            {ProductImages
              ? ProductImages.map((image, index) => (
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
                      alt={name}
                      style={{ width: "120px", cursor: "pointer" }}
                      onClick={() => setSelectedImage(image.address)}
                    />
                  </Container>
                ))
              : null}
          </Container>
        )}

        {/* Imagen principal al centro */}
        <Container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProductMedia component="img" alt={name} src={selectedImage} />
        </Container>

        {/* Nombre y Precio a la derecha */}
        <Container
          sx={{
            padding: isLargeScreen ? "0 8px" : "8px",
          }}
        >
          <Box>
            <Typography
              fontSize={fontSizeName}
              fontWeight="bold"
              paddingTop={5}
            >
              {name}
            </Typography>
            <Typography
              fontSize={fontSizePrice}
              color="#fd611a"
              fontWeight="bold"
              paddingTop={8}
            >
              Precio: ${price}
            </Typography>
          </Box>
          {/* Botón "Agregar al Carrito" */}
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
              size="large"
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </CustomButton>
          </Container>
        </Container>
      </Container>

      {/* Descripción */}
      <Container sx={{ marginTop: 2 }}>
        <Divider sx={{ marginY: 2 }} />
        <Typography fontSize={18} fontWeight={"bold"}>
          Descripción:
        </Typography>
        <Typography>{description}</Typography>
      </Container>

      {/* Garantía */}
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
