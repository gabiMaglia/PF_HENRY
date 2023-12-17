//MATERIAL UI
import { Box, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppComponent = () => {
  const phoneNumber = "+5491132069043";
  const message = "Hola, quiero saber mas acerca del producto...";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "75px",
          right: "75px",
          zIndex: 1000,
          "@media (max-width: 1140px)": { bottom: "30px", right: "75px" },
          "@media (max-width: 768px)": { bottom: "100px", right: "30px" },
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleWhatsAppClick}
          sx={{
            width: "50px",
            borderRadius: "50%",
            backgroundColor: "#25d366",
            "&:hover": { backgroundColor: "#075E54" },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: "50px" }} />
        </Button>
      </Box>
    </>
  );
};

export default WhatsAppComponent;
