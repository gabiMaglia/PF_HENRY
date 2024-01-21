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
            paddingBottom: "30px",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
