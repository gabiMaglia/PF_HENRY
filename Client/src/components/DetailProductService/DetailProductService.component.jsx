import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import {
  getServicesById,
  updateServiceStatus,
} from "../../services/serviceServices";
import useTheme from "@mui/system/useTheme";
import { getUserById } from "../../services/userServices";
import Swal from "sweetalert2";
import { serviceStatuses } from "../../utils/serviceStatuses.js";

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
      const position =
        response.data.Service_status.status !== "Servicio cancelado"
          ? serviceStatuses.progress.indexOf(
              response.data.Service_status.status
            )
          : false;
      const product = {
        date: date,
        name: response.data.product_model,
        image: response.data.Service_images[0].address,
        user_diagnosis: response.data.Service_status.user_diagnosis,
        budget: response.data.Service_status.budget,
        status: response.data.Service_status.status,
        technical_diagnosis: response.data.Service_status.technical_diagnosis,
        final_diagnosis: response.data.Service_status.final_diagnosis,
        statusId: response.data.Service_status.id,
        statusPosition: position,
      };
      authData.userRole === "customer"
        ? getName(response.data.technicianId, product)
        : getName(response.data.userId, product);
    }
  };

  const handleUpdateStatus = async (status, value) => {
    if (
      data.statusPosition !== false &&
      (data.status !== "Esperando confirmación del cliente" ||
        authData.userRole === "customer") &&
      data.status !== "Servicio finalizado" &&
      data.status !== "Servicio cancelado"
    ) {
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });
      Swal.showLoading();
      const response = await updateServiceStatus(data.statusId, status, value);
      if (response?.error) {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Error en la actualización del servicio",
          text: `${response?.error?.response?.statusText}`,
        });
        return false;
      } else {
        Swal.fire({
          allowOutsideClick: false,
          icon: "success",
          title: "Servicio actualizado",
          text: `${response?.data.message}`,
        });
        getService();
        return true;
      }
    }
  };

  const updateValidate = async () => {
    let valid = true;
    let response = false;
    if (data.status === "En proceso de diagnostico") {
      if (data.budget === "Pendiente") {
        response = false;
        valid = response;
        await Swal.fire({
          allowOutsideClick: false,
          icon: "info",
          input: "text",
          title: "Para continuar con la reparación ingrese el presupuesto",
          inputPlaceholder: "Presupuesto: ",
          inputValidator: async (value) => {
            if (!value) {
              return "Debe ingresar el presupuesto para continuar";
            } else {
              Swal.showLoading();
              response = await handleUpdateStatus("budget", `$${value}`);
              valid = response;
            }
          },
        });
      }
      if (data.technical_diagnosis === "Pendiente" && valid) {
        response = false;
        valid = response;
        await Swal.fire({
          allowOutsideClick: false,
          icon: "info",
          input: "text",
          title: "Para continuar con la reparación ingrese el diagnostico",
          inputPlaceholder: "Diagnostico: ",
          inputValidator: async (value) => {
            if (!value) {
              return "Debe ingresar el diagnostico para continuar";
            } else {
              Swal.showLoading();
              response = await handleUpdateStatus("technical_diagnosis", value);
              valid = response;
            }
          },
        });
      }
    } else if (data.status === "Pruebas finales") {
    } else {
      response = true;
    }
    return response;
  };

  const updateStep = async (e) => {
    const { name } = e.target;
    switch (name) {
      case "next":
        const response = await updateValidate();
        if (response === true) {
          handleUpdateStatus(
            "status",
            serviceStatuses.progress[data.statusPosition + 1]
          );
        }
        break;
      case "prev":
        handleUpdateStatus(
          "status",
          serviceStatuses.progress[data.statusPosition - 1]
        );
        break;
      case "cancel":
        handleUpdateStatus("confirm_repair", true);
        break;
      case "approve":
        handleUpdateStatus("confirm_repair", true);
        handleUpdateStatus(
          "status",
          serviceStatuses.progress[data.statusPosition + 1]
        );
        break;
      case "finished":
        handleUpdateStatus(
          "status",
          serviceStatuses.progress[data.statusPosition + 1]
        );
        break;
      default:
        break;
    }
  };

  const renderButtons = () => {
    if (authData.userRole === "technician") {
      return (
        <Box>
          <Button name={"prev"} onClick={updateStep}>
            Volver al paso anterior
          </Button>
          <Button name={"next"} onClick={updateStep}>
            Pasar al siguiente
          </Button>
        </Box>
      );
    } else if (data.status === "Listo para retirar") {
      return (
        <Box>
          <Button name={"finished"} onClick={updateStep}>
            Ya retire el dispositivo
          </Button>
        </Box>
      );
    } else if (data.status === "Esperando confirmación del cliente") {
      return (
        <Box>
          <Button name={"cancel"} onClick={updateStep}>
            Cancelar servicio
          </Button>
          <Button name={"approve"} onClick={updateStep}>
            Aprobar presupuesto
          </Button>
        </Box>
      );
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
          minWidth: "80px",
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
          {renderButtons()}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetailProductService;
