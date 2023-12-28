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
      setProductData(allProducts);
    }
  }, [allProducts]);

  const settings = {
    dots: true,
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
          <Box key={product.id} sx={{ marginBottom: "8px", marginRight: "3%" }}>
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
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <Container
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        textAlign: "start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h2"
                        component="div"
                        fontWeight="bold"
                        sx={{
                          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Container
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignContent: "space-around",
                        }}
                      >
                        <Typography
                          variant="h4"
                          color="#fd611a"
                          fontWeight="bold"
                          sx={{
                            fontSize: { xs: "1.5rem", sm: "3rem", md: "4rem" },
                          }}
                        >
                          ${product.price}
                        </Typography>
                      </Container>
                    </Container>
                  </Box>
                </CardContent>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200px"
                  image={product.ProductImages[0]?.address}
                  style={{
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
