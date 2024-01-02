import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@mui/system";

const CardCarousel = ({ allProducts }) => {
  const [productData, setProductData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (Array.isArray(allProducts)) {
      const filteredProducts = allProducts
        .filter(
          (product) =>
            product?.ProductImages[0]?.address.endsWith(".png") &&
            product.name &&
            product.price
        )
        .slice(0, 5);

      setProductData(filteredProducts);
    }
  }, [allProducts]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "260px",
        marginTop: "8px",
        overflow: "hidden",
        background: `linear-gradient(to bottom left, rgba(0, 0, 0, 1) 40%, #1afd94de 90%)`,
      }}
    >
      <Slider {...settings}>
        {productData.map((product) => (
          <Box
            key={product.id}
            sx={{
              marginBottom: "8px",
              marginRight: "3%",
            }}
          >
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Alinea el contenido al centro
                    justifyContent: "center",
                    color: "white",
                    flex: "1",
                  }}
                >
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center", // Alinea el contenido al centro
                      justifyContent: "center",
                      width: "auto", // Ancho fijo para el contenedor del nombre
                      height: "170px", // Alto fijo para el contenedor del nombre
                      overflow: "hidden", // Oculta el contenido adicional si es demasiado largo
                    }}
                  >
                    <Typography
                      variant="h2"
                      component="div"
                      fontWeight="bold"
                      sx={{
                        fontSize: {
                          xs: "1.8rem",
                          sm: "2.8rem",
                          md: "3.2rem",
                        },
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Container>
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      alignContent: "flex-end",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="#ff5000"
                      fontWeight="bold"
                      sx={{
                        p: "5px",
                        fontSize: {
                          xs: "1rem",
                          sm: "1.5rem",
                          md: "2rem",
                        },
                        marginLeft: "auto",
                      }}
                    >
                      PROMOCION: ${product.price}
                    </Typography>
                  </Container>
                </CardContent>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200px"
                  image={product.ProductImages[0]?.address}
                  sx={{
                    width: "250px",
                    border: "1px solid transparent",
                    marginTop: "8px",
                    marginRight: "3%",
                    boxShadow: "0px 0px 10px rgba(252, 252, 252, 0.5)",
                    borderRadius: "5px",
                  }}
                />
              </Box>
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CardCarousel;
