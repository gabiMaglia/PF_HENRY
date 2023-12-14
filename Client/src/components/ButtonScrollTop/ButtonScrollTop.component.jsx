//HOOKS
import { useState, useEffect } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button } from "@mui/material";

const ButtonScrollTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 400;
    setIsVisible(isScrolled);
  }

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
}
}, [])

  return (
    <>
      <Box
        sx={{ position: "fixed", bottom: "50px", left: "50px", zIndex: 1000, display: isVisible ? "block" : "none" }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleScrollToTop}
          sx={{
            width: "50px",
            borderRadius: "50%",
            backgroundColor: "#fd611a",
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
