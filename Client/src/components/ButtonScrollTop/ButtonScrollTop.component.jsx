//HOOKS
import { useState, useEffect } from "react";
//MATERIAL UI
import { Box, Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ButtonScrollTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 400;
    setIsVisible(isScrolled);
  };
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window]);
  
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "5px",
          left: "60px",
          zIndex: 1000,
          display: isVisible ? "block" : "none",
          "@media (max-width: 1140px)":{ left: "25px", bottom: "30px" },
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
