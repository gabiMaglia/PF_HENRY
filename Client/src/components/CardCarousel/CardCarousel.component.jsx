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
            product.ProductImages[0]?.address.endsWith(".png") &&
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
    autoplaySpeed: 500000,
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "260px",
        backgroundColor: "black",
        paddingTop: "8px",
        marginTop: "8px",
        overflow: "hidden",
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
                    alignItems: "flex-start",
                    justifyContent: "center",
                    color: "white",
                    flex: "1",
                  }}
                >
                  <Container
                    sx={{
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
                          md: "3.5rem",
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
                      color="#fd611a"
                      fontWeight="bold"
                      sx={{
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
                    width: "200px",
                    border: "1px solid transparent",
                    marginTop: "8px",
                    marginRight: "3%",
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
