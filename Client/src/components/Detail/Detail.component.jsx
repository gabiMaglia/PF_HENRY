import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Divider,
  Container,
  Button,
  useMediaQuery,
  styled,
} from "@mui/material";
import { useParams } from "react-router-dom";

const CustomButton = styled(Button)({
  backgroundColor: "#fd611a", // Cambia este color al que desees
  color: "white", // Puedes ajustar el color del texto
  "&:hover": {
    backgroundColor: "#cc4c14", // Cambia este color al que desees para el estado hover
  },
});

const Detail = () => {
  // Base de datos de productos
  const productsData = {
    products: [
      {
        id: 1,
        name: "Gabinete Antec N292 MESH RGB Vidrio Templado",
        price: 20.99,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        images: [
          "/products/1657835109152_img.png",
          "/products/1657851327701_img.png",
          "/products/1658084192936_img.png",
        ],
      },
      {
        id: 2,
        name: "Placa de Video ASUS GeForce GTX 1660 SUPER 6GB DDR6",
        price: 30.5,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "1 año",
        images: [
          "/products/1657835158754_img.png",
          "/products/1658087082308_img.png",
          "/products/1658087021345_img.png",
        ],
      },
      {
        id: 3,
        name: "Auriculares Redragon Scylla H901 PC | PS4 | Switch | XBOX",
        price: 40,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "6 meses",
        image: ["/products/1657848918807_img.png"],
      },
      {
        id: 4,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
      {
        id: 5,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
      {
        id: 6,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
      {
        id: 7,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
      {
        id: 8,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
      {
        id: 9,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
      {
        id: 10,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
      {
        id: 11,
        name: "Mouse Wesdar Cerberus x4 Black Rainbow 2400DPI",
        price: 60,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit mollitia iusto maxime temporibus ea cupiditate corporis quos optio cumque necessitatibus autem at consequuntur nam eligendi repellat alias itaque, odio modi.",
        warranty: "3 años",
        image: ["/products/1658089708829_img.png"],
      },
    ],
  };
  const { id } = useParams();
  const product = productsData.products.find((p) => p.id.toString() === id);

  if (!productsData.products || productsData.products.length === 0) {
    return <div>Cargando...</div>;
  }

  const { name, price, description, warranty, images } = product;
  const [selectedImage, setSelectedImage] = useState(
    images && images.length > 0 ? images[0] : null
  );

  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const fontSizeName = isLargeScreen ? 32 : 24;
  const fontSizePrice = isLargeScreen ? 32 : 24;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            {images &&
              images.map((image, index) => (
                <Container
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={image}
                    alt={name}
                    style={{ width: "120px", cursor: "pointer" }}
                    onClick={() => setSelectedImage(image)}
                  />
                </Container>
              ))}
          </Container>
        )}

        {/* Imagen principal al centro */}
        <Container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: isLargeScreen ? 8 : 0,
          }}
        >
          <img
            src={selectedImage}
            alt={name}
            style={{ width: "100%", maxWidth: "300px" }}
          />
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
              onClick={() => handleAddToCart(product)}
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
        <Typography paddingBottom={5}>
          <strong>Garantía:</strong> {warranty}
        </Typography>
      </Container>
    </Container>
  );
};

export default Detail;
