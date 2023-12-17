import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselBottomComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 21);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: true,
    variableWidth: true,
    beforeChange: (_oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        "@media (max-width: 1140px)": {
          height: "100px",
        },
        "@media (max-width: 768px)": {
          height: "100px",
        },
        "@media (max-width: 480px)": {
          visibility: "hidden"
        },
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          width: "100%",
          padding: "10px",
        }}
      >
        <Slider {...settings}>
          {[...Array(21)].map((_, index) => (
            <Box key={index} >
              <img
                src={`/logos/image${((index + currentSlide) % 21) + 1}.png`}
                alt={`Brand ${index + 1}`}
                style={{ width: "80px", height: "80px", margin: "0 60px" }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CarouselBottomComponent;
