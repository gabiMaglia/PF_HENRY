import { Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";

const SafePurchaseComponent = () => {
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            "@media (max-width: 768px)": {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              transform: "scale(.9)"
            }
          }}
        >
          <Box>
            <Typography
              variant="h7"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <LocalShippingIcon /> Enviamos tu compra
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Entregas en todo el país
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h7"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <CreditCardIcon /> Pagá como quieras
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Tarjetas de crédito y débito
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h7"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <LockIcon /> Comprá con seguridad
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              Tus datos siempre protegidos
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SafePurchaseComponent;
