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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
    product.displayData.unshift({
      message: authData.userRole === "customer" ? "Tecnico:" : "Cliente:",
      data: response.name + " " + response.surname,
    });
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
        status: response.data.Service_status.status,
        name: response.data.product_model,
        image: response.data.Service_images[0].address,
        displayData: [
          {
            message: "Diagnóstico del usuario:",
            data: response.data.Service_status.user_diagnosis,
          },
          {
            message: "Diagnóstico del tecnico:",
            data: response.data.Service_status.technical_diagnosis,
          },
          {
            message: "Diagnóstico final:",
            data: response.data.Service_status.final_diagnosis,
          },
          {
            message: " Presupuesto:",
            data: response.data.Service_status.budget,
          },
          {
            message: "Estado de la reparación:",
            data: response.data.Service_status.status,
          },
        ],
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
      response = false;
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
      if (data.status !== "Esperando confirmación del cliente") {
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
      } else {
        return (
          <Typography sx={{ color: "red", mt: "1em" }}>
            Espere a que el cliente confirme la compra
          </Typography>
        );
      }
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
      <Card
        sx={{
          mt: "2em",
          pt: "5em",
          pb: "5em",
          minHeight: "50vh",
          position: "relative",
          width: "100%",
          border: "1px solid black",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fd611a",
            borderRadius: "10px",
            textAlign: "center",
            position: "absolute",
            top: 10,
            left: 10,
            display: "flex",
            alignItems: "center",
            pr: "3px",
            pl: "3px",
          }}
        >
          <Button
            sx={{ color: "white" }}
            onClick={() => {
              setOpenDetail(false);
            }}
          >
            <ArrowBackIosIcon sx={{ color: "white", height: "70%" }} />
            Volver
          </Button>
        </Box>
        <Box>
          <CardMedia
            component="img"
            sx={{ mxWidth: "350px" }}
            src={data.image}
          />
        </Box>
        <CardContent
          sx={{
            display: "flex",
            flexFlow: "column",
            width: "100%",
            height: "100%",
            alignContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              gap: ".7em",
            }}
          >
            {data.name && (
              <Typography
                variant="h5"
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
                  position: "absolute",
                  top: 5,
                  right: 5,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: ".8em",
                  },
                }}
              >
                Fecha de ingreso: {data.date}
              </Typography>
            )}
            {data.displayData &&
              data.displayData.map((data) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#000", fontWeight: "bold" }}
                    >
                      {data.message}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#000" }}
                    >
                      {data.data}
                    </Typography>
                  </Box>
                );
              })}
          </Box>
          <Box sx={{ mt: "2em" }}>{renderButtons()}</Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetailProductService;
