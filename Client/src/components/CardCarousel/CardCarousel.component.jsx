//HOOKS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//MATREIAL UI
import {
  CardContent,
  Typography,
  Box,
  CardMedia, 
} from "@mui/material";
import { Container } from "@mui/system";
//FIREBASE
import { viewDetailProduct } from "../../services/firebaseAnayticsServices";

import miVideo from "/carousel/prueba.mp4";
import DiscountBanner from "./CarouselParts/DiscountBanner";

const CardCarousel = ({ allProducts }) => {
  const [productData, setProductData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);


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
        maxHeight: "260px",
        marginTop: "8px",
        overflow: "hidden",
        opacity: "1",
        // background: 'rgb(233,91,69)',
        background: `linear-gradient(to bottom left, rgba(0, 0, 0, 1) 60%, rgba(26, 253, 148, 0) 96%)`,
        // background: 'radial-gradient(circle, #FF884E 100%, rgba(255,255,255,0) 100%)',
        visibility: "visible",
        display: "none",
        "@media (min-width: 901px)": {
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
            height: "262px",
          }}
          >
            <Link
              to={`/product/${product.id}`}
              onClick={() => viewDetailProduct(product, true)}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  
                  paddingInline: "5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  height: "100%",
                  overflow: 'hidden',
                  // border: "3px solid black",
                }}
                >
                <CardContent
                  sx={{
                    overflow: 'hidden',
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    textAlign: 'center'
                  }}
                  >
                  <Typography
                    variant="h2"
                    component="div"
                    fontWeight="bold"
                    sx={{
                      textStroke: '.1px black',
                      // WebkitTextStroke: '.1px black',
                      minWidth: "280px",
                      color: "white",
                      fontSize: {
                        xs: ".8rem",
                        sm: "1.8rem",
                        md: "1.6rem",
                        lg: "2.4rem",
                        xl: "3.4rem",
                      },
                      letterSpacing: "6px",
                    }}
                    >
                    {product.name.toUpperCase()}
                  </Typography>

                  <Typography
                  
                  variant="h4"
                  color="#ff5000"
                  sx={{
                    textShadow: "0px 0px 10px rgb(0 0 0 / 80%)",
                    fontSize: {
                      xs: ".6rem",
                      sm: "1.4rem",
                      md: "1.6rem",
                      lg: "2rem",
                      xl: "2.5rem",
                    },
                    // marginLeft: "auto",
                    animation: "blink 1s infinite",
                    fontWeight: "700",
                    // boxShadow: "0px 0px 10px rgb(255 255 255 / 90%)",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                    OFERTA {formatPrice(product.price)}
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
                </CardContent>
                <Container
                  sx={{
                    flex: '1',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative'
                    
                  }}
                  >
                  <CardMedia
                    component="img"
                    alt={product.name}
                    image={product.ProductImages[0]?.address}
                    sx={{
                      maxWidth: "390px",  
                    }}
                  />
                    <DiscountBanner text={'Hasta un 30% de descuento!'} rotate={50} />
                </Container>
                    
              </Box>
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  ) : null;
};

export default CardCarousel;
