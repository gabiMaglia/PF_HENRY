import React, { useState, useEffect } from "react";
import imagen from "/carousel/carousel-1.png"
import imagen2 from "/carousel/carousel-2.png"
import imagen3 from "/carousel/carousel-3.png"

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Implementacion del Carusel
const carouselData = [
  {
    imageUrl: imagen,
  },
  {
    imageUrl: imagen2,
  },
  {
    imageUrl: imagen3,
  },
];

const CarouselTopComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000); // Cambia la imagen cada 3 segundos.

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta.
  }, [activeIndex]);

  return (
    <div>
      <Card sx={{ height: "280px" }}>
        <CardMedia
          component="img"
          alt={carouselData[activeIndex].title}
          width="100%"
          height="auto"
          image={carouselData[activeIndex].imageUrl}
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
