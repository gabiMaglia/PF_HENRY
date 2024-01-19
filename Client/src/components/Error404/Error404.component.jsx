import { Box, Button, Typography, Link } from "@mui/material";
import PATHROUTES from "../../helpers/pathRoute";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Error404Component = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(PATHROUTES.HOME);
    }, 4000);
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h2" sx={{ fontSize: "150px" }}>
            Error 404
          </Typography>
          <Typography variant="h2" sx={{ fontSize: "80px" }}>
            Página Inexistente
          </Typography>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Link href={PATHROUTES.HOME}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#fd611a", fontSize: "22px" }}
            >
              Volver al Inicio
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Error404Component;
