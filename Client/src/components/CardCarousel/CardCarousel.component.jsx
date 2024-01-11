import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
  useTheme,
} from "@mui/material";
//FIREBASE
import { viewDetailProduct } from "../../services/firebaseAnayticsServices";

import { Container } from "@mui/system";
import miVideo from "/carousel/prueba.mp4";

const CardCarousel = ({ allProducts }) => {
  const [productData, setProductData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      const filteredProducts = allProducts.filter(
        (product) =>
          product?.ProductImages[0] &&
          product.name &&
          product.price &&
          product.carousel === true
      );
      setProductData(filteredProducts);
      setDataLoaded(true);
    } else {
      setDataLoaded(false);
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

  const formatPrice = (price) => {
    return "$" + price.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  };

  return dataLoaded ? (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "260px",
        marginTop: "8px",
        overflow: "hidden",
        opacity: "1",
        background: `linear-gradient(to bottom left, rgba(0, 0, 0, 1) 40%, rgba(26, 253, 148, 0) 90%)`,
        visibility: "visible", // Show the component
        display: "none", // Default to hidden
        "@media (min-width: 901px)": {
          // Only show the component when the screen size is greater than 900px
          display: "block",
        },
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.7,
          zIndex: -1,
        }}
        playbackrate={0.4}
      >
        <source src={miVideo} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
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
              onClick={() => viewDetailProduct(product, true)}
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
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    flex: "1",
                  }}
                >
                  <Container
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "auto",
                      height: "170px",
                      overflow: "hidden",
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
                        textShadow: "0px 0px 10px rgb(0 0 0 / 80%)",
                        p: "5px",
                        fontSize: {
                          xs: "1rem",
                          sm: "1.5rem",
                          md: "2rem",
                        },
                        marginLeft: "auto",
                        animation: "blink 1s infinite",
                      }}
                    >
                      PROMOCION: {formatPrice(product.price)}
                    </Typography>
                    <style jsx="true">{`
                      @keyframes blink {
                        50%,
                        5%,
                        100% {
                          opacity: 1;
                        }
                        90%,
                        100% {
                          opacity: 0.5;
                        }
                      }
                    `}</style>
                  </Container>
                </CardContent>
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.ProductImages[0]?.address}
                  sx={{
                    width: "200px",
                    height: "auto",
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
  ) : null;
};

export default CardCarousel;
