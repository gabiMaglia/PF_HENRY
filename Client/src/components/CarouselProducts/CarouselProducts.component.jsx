import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard.component";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselProducts = ({ allProducts }) => {
  const [carouselProducts, setCarouselProducts] = useState([]);

  useEffect(() => {
    const randomProducts = allProducts.slice().sort(() => Math.random() - 0.5);
    const limitedProducts = randomProducts.slice(0, 8);
    setCarouselProducts(limitedProducts);
  }, [allProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3, // Mostrar 3 tarjetas inicialmente
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    centerMode: carouselProducts.length === 1, // Habilitar centerMode solo si hay una tarjeta
  };

  return (
    <Container sx={{ marginBottom: 20 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ textTransform: "uppercase" }}
      >
        MAS PRODUCTOS
      </Typography>
      <Slider {...settings} sx={{ display: "flex" }}>
        {carouselProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </Container>
  );
};

export default CarouselProducts;
