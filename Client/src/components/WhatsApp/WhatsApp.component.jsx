import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button } from "@mui/material";

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
        sx={{ position: "fixed", bottom: "50px", right: "50px", zIndex: 1000 }}
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
