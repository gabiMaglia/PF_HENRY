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
//ICONS
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import useTheme from "@mui/system/useTheme";
import { getUserById } from "../../services/userServices";
import Swal from "sweetalert2";
import { serviceStatuses } from "../../utils/serviceStatuses.js";

const DetailProductService = ({
  id,
  authData,
  setOpenDetail,
  setIsLoading,
  getAllServices = () => {},
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
            message: "Informe de reparación:",
            data: response.data.Service_status.final_diagnosis,
          },
          {
            message: "Presupuesto:",
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

  const handleUpdateStatus = async (status, value, notification) => {
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
        notification
          ? Swal.fire({
              allowOutsideClick: false,
              icon: "success",
              title: "Servicio actualizado",
              text: `${response?.data}`,
            })
          : Swal.close();
        getService();
        return true;
      }
    }
  };

  const updateValidate = async () => {
    let response = false;
    const budget = data.displayData.find(
      (item) => item.message === "Presupuesto:"
    ).data;
    const technical_diagnosis = data.displayData.find(
      (item) => item.message === "Diagnóstico del tecnico:"
    ).data;
    const final_diagnosis = data.displayData.find(
      (item) => item.message === "Informe de reparación:"
    ).data;
    let newBudget = false;
    let newDiagnosis = false;
    if (data.status === "En proceso de diagnostico") {
      if (budget === "Pendiente") {
        response = false;
        await Swal.fire({
          confirmButtonColor: "#fd611a",
          confirmButtonText: "Confirmar",
          icon: "info",
          input: "text",
          title: "Para continuar con la reparación ingrese el presupuesto",
          inputPlaceholder: "Presupuesto: ",
          inputValidator: async (value) => {
            if (!value) {
              return "Debe ingresar el presupuesto para continuar";
            } else {
              newBudget = value;
            }
          },
        }).then(async (result) => {
          if (technical_diagnosis === "Pendiente" && result.isConfirmed) {
            response = false;
            await Swal.fire({
              allowOutsideClick: false,
              icon: "info",
              confirmButtonColor: "#fd611a",
              confirmButtonText: "Confirmar",
              input: "text",
              title: "Para continuar con la reparación ingrese el diagnostico",
              inputPlaceholder: "Diagnostico: ",
              inputValidator: async (value) => {
                if (!value) {
                  return "Debe ingresar el diagnostico para continuar";
                } else {
                  newDiagnosis = value;
                }
              },
            });
          } else {
            response = true;
          }
        });
        Swal.showLoading();
        response = await handleUpdateStatus("budget", `$${newBudget}`);
        Swal.showLoading();
        response = await handleUpdateStatus(
          "technical_diagnosis",
          newDiagnosis
        );
      } else {
        response = true;
      }
    } else if (data.status === "Pruebas finales") {
      if (final_diagnosis === "Pendiente") {
        response = false;
        await Swal.fire({
          allowOutsideClick: true,
          icon: "info",
          confirmButtonColor: "#fd611a",
          confirmButtonText: "Confirmar",
          input: "text",
          title: "Para continuar con la reparación ingrese el informe final",
          inputPlaceholder: "Informe de reparación: ",
          inputValidator: async (value) => {
            if (!value) {
              return "Debe ingresar el informe para continuar";
            } else {
              Swal.showLoading();
              response = await handleUpdateStatus("final_diagnosis", value);
            }
          },
        });
      }
    } else {
      response = true;
    }
    console.log(response);
    return response;
  };

  const updateStep = async (e) => {
    const { name } = e.currentTarget;
    switch (name) {
      case "next":
        const response = await updateValidate();
        if (response === true) {
          await handleUpdateStatus(
            "status",
            serviceStatuses.progress[data.statusPosition + 1],
            false
          );
        }
        break;
      case "prev":
        await handleUpdateStatus(
          "status",
          serviceStatuses.progress[data.statusPosition - 1],
          true
        );
        break;
      case "cancel":
        await handleUpdateStatus("confirm_repair", false, false);
        await handleUpdateStatus("status", serviceStatuses.cancel, true);
        break;
      case "approve":
        await handleUpdateStatus("confirm_repair", true, false);
        await handleUpdateStatus(
          "status",
          serviceStatuses.progress[data.statusPosition + 1],
          true
        );
        break;
      case "finished":
        await handleUpdateStatus(
          "status",
          serviceStatuses.progress[data.statusPosition + 1],
          true
        );
        break;
      default:
        break;
    }
  };

  const renderButtons = () => {
    if (
      data.status === "Servicio finalizado" ||
      data.status === "Servicio cancelado"
    ) {
      const final = data.status.split(" ")[1];
      return (
        <Typography
          variant="h4"
          className={final}
          sx={{
            border: "1px solid black",
            p: ".2em",
            borderRadius: "20px",
            "&.finalizado": { backgroundColor: "green" },
            "&.cancelado": { backgroundColor: "red" },
          }}
        >
          {data.status}
        </Typography>
      );
    }
    if (authData.userRole === "technician") {
      if (data.status !== "Esperando confirmación del cliente") {
        if (data.status === "Listo para retirar") {
          return (
            <Box>
              <Button
                sx={{ minWidth: "100px" }}
                name={"finished"}
                onClick={updateStep}
              >
                <Typography>Dispositivo retirado</Typography>
                <LocalShippingIcon />
              </Button>
            </Box>
          );
        } else {
          return (
            <Box>
              {data.status !== "Local esperando llegada" && (
                <Button name={"prev"} onClick={updateStep}>
                  <FastRewindIcon />
                  <Typography>Volver al paso anterior</Typography>
                </Button>
              )}
              <Button name={"next"} onClick={updateStep}>
                <Typography>Pasar al siguiente</Typography>
                <FastForwardIcon />
              </Button>
            </Box>
          );
        }
      } else {
        return (
          <Typography variant="h6" sx={{ color: "red", mt: "1em" }}>
            Espere a que el cliente confirme la reparación
          </Typography>
        );
      }
    } else if (data.status === "Listo para retirar") {
      return (
        <Box>
          <Button name={"finished"} onClick={updateStep}>
            <Typography>Ya retire el dispositivo</Typography>
            <LocalShippingIcon />
          </Button>
        </Box>
      );
    } else if (data.status === "Esperando confirmación del cliente") {
      return (
        <Box>
          <Button name={"cancel"} className="cancel" onClick={updateStep}>
            <CancelOutlinedIcon />
            <Typography>Cancelar servicio</Typography>
          </Button>
          <Button name={"approve"} className="approve" onClick={updateStep}>
            <Typography>Aprobar presupuesto</Typography>
            <DoneOutlinedIcon />
          </Button>
        </Box>
      );
    } else {
      return (
        <Typography variant="h6" sx={{ color: "#fd611a", mt: "1em" }}>
          El tecnico asignado esta trabajando en su dispositivo
        </Typography>
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
          flexDirection: "column",
          [theme.breakpoints.up("lg")]: {
            flexDirection: "row",
          },
          justifyContent: "center",
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
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "rgba(249, 112, 49, 0.9)" },
            }}
            onClick={() => {
              getAllServices();
              setOpenDetail(false);
            }}
          >
            <ArrowBackIosIcon sx={{ color: "white", height: "70%" }} />
            Volver
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            [theme.breakpoints.up("lg")]: {
              width: "100%",
            },
            [theme.breakpoints.up("lg")]: {
              maxWidth: "30%",
            },
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxWidth: "200px",
            }}
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
            maxWidth: "60%",
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
              data.displayData.map((data, key) => {
                return (
                  <Box
                    key={key}
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
          <Box
            sx={{
              mt: "2em",
              "& button": {
                gap: "4px",
                justifyContent: "center",
                alignItems: "center",
                pl: "20px",
                pr: "20px",
                maxHeight: "45px",
                backgroundColor: "#fd611a",
                "&.cancel": {
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.7)" },
                },
                "&.approve": {
                  backgroundColor: "green",
                  "&:hover": { backgroundColor: "rgba(0, 200, 0, 0.9)" },
                },
                color: "white",
                m: "1em",
                "&:hover": { backgroundColor: "rgba(249, 112, 49, 0.9)" },
              },
            }}
          >
            {renderButtons()}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetailProductService;
