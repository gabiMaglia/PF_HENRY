//HOOKS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//MATERIAL UI
import { Card, Box } from "@mui/material";
//IMAGES - CAROUSEL
import desktopImage1 from "/carousel/desktop1.svg";
import desktopImage2 from "/carousel/desktop2.svg";
import desktopImage3 from "/carousel/desktop3.svg";
import laptopImagen1 from "/carousel/laptop1.svg";
import laptopImagen2 from "/carousel/laptop2.svg";
import laptopImagen3 from "/carousel/laptop3.svg";
import tabletImagen1 from "/carousel/tablet1.svg";
import tabletImagen2 from "/carousel/tablet2.svg";
import tabletImagen3 from "/carousel/tablet3.svg";
import mobileImage1 from "/carousel/mobile1.svg";
import mobileImage2 from "/carousel/mobile2.svg";
import mobileImage3 from "/carousel/mobile3.svg";

const carouselData = [
  {
    desktopImageUrl: desktopImage1,
    laptopImagenUrl: laptopImagen1,
    tabletImagenUrl: tabletImagen1,
    mobileImageUrl: mobileImage1,
  },
  {
    desktopImageUrl: desktopImage2,
    laptopImagenUrl: laptopImagen2,
    tabletImagenUrl: tabletImagen2,
    mobileImageUrl: mobileImage2,
  },
  {
    desktopImageUrl: desktopImage3,
    laptopImagenUrl: laptopImagen3,
    tabletImagenUrl: tabletImagen3,
    mobileImageUrl: mobileImage3,
  },
];

const CarouselTopComponent = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    let newIndex = (activeIndex + 1) % carouselData.length;
    setActiveIndex(newIndex);
  };

  const handleImageClick = () => {
    let productUrl;

    switch (activeIndex) {
      case 0:
        productUrl =
          "/product/06d7c687-923c-4f4e-8749-bb606dc1ebf4";
        break;
      case 1:
        productUrl =
          "/product/9e0f7a1a-65c6-4eaf-b85e-8e9f8f628ee1";
        break;
      case 2:
        productUrl =
          "/product/0445b484-f8e0-4c3a-93bb-907288ac4abc";
        break;
      default:
        break;
    }
    if (productUrl) {
      navigate(productUrl);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [activeIndex]);

  return (
    <Box sx={{ paddingTop: "10px", cursor: "pointer" }}>
      <a
        onClick={handleImageClick}
      >
        <Card
          sx={{
            width: "100%",
            height: "260px",
            backgroundImage: `url('${carouselData[activeIndex].desktopImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "@media (max-width: 1140px)": {
              height: "210px",
              backgroundImage: `url('${carouselData[activeIndex].laptopImagenUrl}')`,
            },
            "@media (max-width: 768px)": {
              height: "150px",
              backgroundImage: `url('${carouselData[activeIndex].tabletImagenUrl}')`,
            },
            "@media (max-width: 480px)": {
              display: "none"
              // height: "100px",
              // backgroundImage: `url('${carouselData[activeIndex].mobileImageUrl}')`,
            },
          }}
        ></Card>
      </a>
    </Box>
  );
};

export default CarouselTopComponent;
