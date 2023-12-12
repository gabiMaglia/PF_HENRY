import React, { useState, useEffect } from "react";
import imagen from "/carousel/carousel-1.png";
import imagen2 from "/carousel/carousel-2.png";
import imagen3 from "/carousel/carousel-3.png";
import imagenMobile from "/carousel/carousel-mobile-1.png";
import imagenMobile2 from "/carousel/carousel-mobile-2.png";
import imagenMobile3 from "/carousel/carousel-mobile-3.png";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

// Implementacion del Carusel
// const carouselData = [
//   {
//     imageUrl: imagen,
//   },
//   {
//     imageUrl: imagen2,
//   },
//   {
//     imageUrl: imagen3,
//   },
// ];
const carouselData = [
  {
    imageUrl: imagen,
    mobileImageUrl: imagenMobile,
  },
  {
    imageUrl: imagen2,
    mobileImageUrl: imagenMobile2,
  },
  {
    imageUrl: imagen3,
    mobileImageUrl: imagenMobile3,
  },
];

const CarouselTopComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // const handleNext = () => {
  //   setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  // };
  const handleNext = () => {
    const windowWidth = window.innerWidth;
    let newIndex;

    if (windowWidth <= 480) {
      newIndex = (activeIndex + 1) % carouselData.length;
    } else {
      newIndex = (activeIndex + 1) % carouselData.length;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000); // Cambia la imagen cada 3 segundos.

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta.
  }, [activeIndex]);

  return (
    <div>
      <Card
        sx={{
          height: "280px",
          "@media (max-width: 768px)": { height: "150px" },
          "@media (max-width: 480px)": { height: "125px" },
        }}
      >
        <CardMedia
          component="img"
          alt={carouselData[activeIndex].title}
          width="100%"
          height="auto"
          // image={carouselData[activeIndex].imageUrl}
          image={
            window.innerWidth <= 480
              ? carouselData[activeIndex].mobileImageUrl
              : carouselData[activeIndex].imageUrl
          }
          sx={{
            "@media (max-width: 768px)": { width: "auto", height: "160px" },
            "@media (max-width: 480px)": { width: "100%", height: "130px" },
          }}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {carouselData[activeIndex].title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {carouselData[activeIndex].description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarouselTopComponent;
