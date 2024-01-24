// HOOKS
import { useState, useEffect } from "react";
// MATERIAL UI
import { Box, Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ButtonScrollTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // MANEJA LA VISIBILIDAD DEL BOTON
  const handleVisibility = () => {
    const isScrolled = window.scrollY > 400;
    setIsVisible(isScrolled);
  };

  // MANEJA LA ACCION QUE TE LLEVA HACIA ARRIBA
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      handleVisibility(); 
    };
    console.log(scrollPosition)
    console.log(window.scrollY)
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "5px",
          left: "60px",
          zIndex: 1000,
          display: isVisible ? "block" : "none",
          "@media (max-width: 1140px)": { left: "25px", bottom: "30px" },
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleScrollToTop}
          sx={{
            width: "50px",
            borderRadius: "50%",
            backgroundColor: "#fd611a",
            transform: "scale(.7)",
            "&:hover": { backgroundColor: "#923807" },
          }}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: "50px", color: "#000000" }} />
        </Button>
      </Box>
    </>
  );
};

export default ButtonScrollTopComponent;
