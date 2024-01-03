//HOOKS
import { useState } from "react";
//MATERIAL UI
import { Box, Button, Popover, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const WhatsAppComponent = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const phoneNumber = "+5491132069043";
  const message = "Hola, quiero saber mas acerca del producto...";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  const handlePopoverToggle = () => {
    setPopoverOpen((prev) => !prev);
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
          onClickCapture={handlePopoverToggle}
          aria-describedby="whatsapp-popover"
          sx={{
            width: "50px",
            borderRadius: "50%",
            backgroundColor: "#25d366",
            "&:hover": { backgroundColor: "#075E54" },
          }}
        >
          <WhatsAppIcon sx={{ fontSize: "50px" }} />
        </Button>
        <Popover
          id="whatsapp-popover"
          open={popoverOpen}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={() => setPopoverOpen(false)}
        >
          <Typography sx={{ padding: 2 }}>
            ¡Hola! ¿En qué puedo ayudarte?
          </Typography>
        </Popover>
      </Box>
    </>
  );
};

export default WhatsAppComponent;
