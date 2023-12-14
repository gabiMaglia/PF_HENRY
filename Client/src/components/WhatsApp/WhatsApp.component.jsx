//HOOKS
// import { useState, useEffect } from "react";
//MATERIAL UI
import { Box, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppComponent = () => {
  // const [isVisible, setIsVisible] = useState(false);

  // const handleScroll = () => {
  //   const isScrolled = window.scrollY > 50;
  //   setIsVisible(isScrolled);
  // };

  const phoneNumber = "+5491132069043";
  const message = "Hola, quiero saber mas acerca del producto...";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <Box
        sx={{ position: "fixed", bottom: "50px", right: "75px", zIndex: 1000, /*display: isVisible ? "block" : "none"*/ }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleWhatsAppClick}
          sx={{
            width: "50px",
            borderRadius: "50%",
            backgroundColor: "#25d366",
            "&:hover": { backgroundColor: "#075354" },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: "50px" }} />
        </Button>
      </Box>
    </>
  );
};

export default WhatsAppComponent;
