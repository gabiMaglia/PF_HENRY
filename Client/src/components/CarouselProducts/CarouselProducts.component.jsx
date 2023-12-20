import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard.component";
import { Container, Typography } from "@mui/material";
import Slider from "react-slick";

const CarouselProducts = ({ allProducts }) => {
  const [carouselProducts, setCarouselProducts] = useState([]);

  useEffect(() => {
    const randomProducts = allProducts.slice().sort(() => Math.random() - 0.5);
    setCarouselProducts(randomProducts);
  }, [allProducts]);

  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  });

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}
    >
      <Typography
        paddingLeft={8}
        margin={2}
        fontWeight="bold"
        fontSize={24}
        sx={{ textTransform: "uppercase" }}
      >
        MAS PRODUCTOS:
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "space-around",
          marginBottom: 5,
          gap: 1,
          [`@media (max-width: 900px)`]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Slider {...settings}>
          {carouselProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      </Container>
    </Container>
  );
};

export default CarouselProducts;
