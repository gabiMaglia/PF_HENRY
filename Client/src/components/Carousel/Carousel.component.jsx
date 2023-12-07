import React, { useState, useEffect } from "react";
import imagen from "../../assets/BF.jpg";
import imagen1 from "../../assets/descuento.jpg";
import imagen2 from "../../assets/HS.jpg";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const carouselData = [
  {
    imageUrl: imagen,
    height: "100%",
    width: "100%",
  },
  {
    imageUrl: imagen1,
    height: "100%",
    width: "100%",
  },
  {
    imageUrl: imagen2,
    height: "100%",
    width: "100%",
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000); // Cambia la imagen cada 3 segundos (ajusta según tus necesidades)

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [activeIndex]);

  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          alt={carouselData[activeIndex].title}
          height="240px"
          width="100%"
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

export default Carousel;
