import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { getServicesById } from "../../services/serviceServices";
import useTheme from "@mui/system/useTheme";
import { getUserById } from "../../services/userServices";
import Swal from "sweetalert2";

const DetailProductService = ({
  id,
  authData,
  setOpenDetail,
  setIsLoading,
}) => {
  const [data, setData] = useState({});
  const theme = useTheme();

  const getName = async (id, product) => {
    const response = await getUserById(id);
    product.userName = response.name + " " + response.surname;
    setData(product);
    setIsLoading(false);
  };

  const getService = async () => {
    const response = await getServicesById(id);
    if (response.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en la carga del servicio",
        text: `${response?.error?.response?.statusText}`,
      });
    } else {
      let date = response.data.product_income_date.split("T")[0];
      date = date.split("-");
      date = date[2] + "/" + date[1] + "/" + date[0];
      const product = {
        date: date,
        name: response.data.product_model,
        image: response.data.Service_images[0].address,
        user_diagnosis: response.data.Service_status.user_diagnosis,
        budget: response.data.Service_status.budget,
        status: response.data.Service_status.status,
        technical_diagnosis: response.data.Service_status.technical_diagnosis,
        final_diagnosis: response.data.Service_status.final_diagnosis,
      };
      authData === "customer"
        ? getName(response.data.technicianId, product)
        : getName(response.data.userId, product);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getService();
  }, [id]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#fd611a",
          borderRadius: "10px",
          width: "10%",
          textAlign: "center",
          mt: "1em",
          mb: "1em",
        }}
      >
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            setOpenDetail(false);
          }}
        >
          Volver
        </Button>
      </Box>
      <Card
        sx={{
          width: "100%",
          border: "1px solid black",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box>
          <CardMedia
            component="img"
            height="140"
            sx={{
              objectFit: "cover",
              maxHeight: "140px",
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
              ml: ".5em",
              width: "8em",
              height: "5em",
              objectFit: "contain",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            src={data.image}
          />
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexFlow: "row",
            width: "100%",
            height: "100%",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              height: "100%",
              transition: "transform 0.3s",
              gap: ".5em",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            {data.name && (
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {data.name}
              </Typography>
            )}
            {data.date && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    fontSize: ".8em",
                  },
                }}
              >
                Fecha de ingreso: {data.date}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#000" }}
            >
              {authData.userRole === "customer" ? "Técnico" : "Cliente"}:{" "}
              {data.userName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#000" }}
            >
              Diagnóstico del usuario: {data.user_diagnosis}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#000" }}
            >
              Diagnóstico del técnico: {data.technical_diagnosis}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#000" }}
            >
              Diagnóstico final: {data.final_diagnosis}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#000" }}
            >
              Presupuesto: {data.budget}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#000" }}
            >
              Estado de la reparación: {data.status}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetailProductService;
