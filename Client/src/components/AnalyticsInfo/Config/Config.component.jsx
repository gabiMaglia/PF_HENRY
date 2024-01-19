import {
  Typography,
  Modal,
  Divider,
  Button,
  Box,
  Input,
  Autocomplete,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { metrics, dimensions } from "../dataTypes";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { configValidate } from "../../../helpers/configAnalyticsValidate";
import Swal from "sweetalert2";

const boxModalStyle = {
  height: "auto",
  maxHeight: "90%",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  minWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "1em",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

const Config = ({
  open,
  setOpen,
  getData,
  config,
  setConfig,
  metricStatus,
  dimensionStatus,
  setMetricStatus,
  setDimensionStatus,
  graphicType,
  setGraphicType,
  dataOrder,
  setDataOrder,
  showRealtime,
  setShowRealtime,
}) => {
  const handleMetricsDimensionChange = (value, name, position) => {
    const newData =
      name === "metrics" ? [...metricStatus] : [...dimensionStatus];
    newData[position] = value;
    if (name === "metrics") {
      setMetricStatus(newData);
    } else {
      setDimensionStatus(newData);
    }
  };

  const handleSubmit = () => {
    const actErrors = configValidate({
      graph: graphicType,
      order: dataOrder,
      startDate: config.startDate,
      endDate: config.endDate,
      metrics: metricStatus,
      dimensions: dimensionStatus,
    });
    if (
      actErrors?.graph?.length > 0 ||
      actErrors?.order?.length > 0 ||
      actErrors?.startDate?.length > 0 ||
      actErrors?.endDate?.length > 0 ||
      actErrors?.dates?.length > 0 ||
      actErrors?.metrics?.length > 0 ||
      actErrors?.dimensions?.length > 0
    ) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en el formulario",
        text: "Por favor revise los campos del formulario",
        html: `<div>
            <ul>
           ${actErrors?.graph?.length > 0 ? `<li>${actErrors?.graph}</li>` : ""}
           ${actErrors?.order?.length > 0 ? `<li>${actErrors?.order}</li>` : ""}
           ${
             actErrors?.startDate?.length > 0
               ? `<li>${actErrors?.startDate}</li>`
               : ""
           }
           ${
             actErrors?.endDate?.length > 0
               ? `<li>${actErrors?.endDate}</li>`
               : ""
           }
           ${actErrors?.dates?.length > 0 ? `<li>${actErrors?.dates}</li>` : ""}
           ${
             actErrors?.metrics?.length > 0
               ? `<li>${actErrors?.metrics}</li>`
               : ""
           }
           ${
             actErrors?.dimensions?.length > 0
               ? `<li>${actErrors?.dimensions}</li>`
               : ""
           }
            </ul>
          </div>`,
        customClass: {
          container: "container",
        },
      });
    } else {
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
        customClass: {
          container: "container",
        },
      });
      Swal.showLoading();
      setShowRealtime(false);
      getData();
    }
  };

  const handleChangeGraphicsType = (value) => {
    setGraphicType(value);
  };

  const deleteMetricDimensions = (index, type) => {
    if (type === "metrics") {
      if (metricStatus.length > 1) {
        let newData = [...metricStatus];
        newData.splice(index, 1);
        setMetricStatus(newData);
      }
    } else {
      if (dimensionStatus.length > 1) {
        let newData = [...dimensionStatus];
        newData.splice(index, 1);
        setDimensionStatus(newData);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={setOpen}
    >
      <Box sx={boxModalStyle}>
        <Button
          sx={{
            padding: "0px",
            color: "black",
            width: ".01px",
            height: ".01px",
          }}
        >
          <CancelIcon
            sx={{
              position: "fixed",
              top: ".5em",
              right: ".5em",
            }}
            onClick={setOpen}
          />
        </Button>
        <Divider sx={{ color: "#fd611a", fontWeight: "bold" }}>
          <Typography variant="h6">Configuración</Typography>
        </Divider>
        <Box sx={{ display: "flex", gap: "3em" }}>
          <Autocomplete
            sx={{ flexGrow: "1" }}
            onChange={(e, value) => handleChangeGraphicsType(value)}
            value={graphicType}
            options={["Linea", "Barras", "Circular"]}
            renderInput={(params) => (
              <TextField {...params} label="Tipo de grafico" />
            )}
          />
          <Autocomplete
            sx={{ flexGrow: "1" }}
            onChange={(e, value) => setDataOrder(value)}
            value={dataOrder}
            options={["Descendente", "Ascendente"]}
            renderInput={(params) => <TextField {...params} label="Orden" />}
          />
        </Box>

        <Typography variant="body2">Seleccione un rango de fechas</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "3em",
            justifyContent: "center",
          }}
        >
          <Input
            type="date"
            value={config.startDate}
            name="startDate"
            onChange={handleChange}
          />
          <Input
            type="date"
            value={config.endDate}
            name="endDate"
            onChange={handleChange}
          />
        </Box>

        <Typography variant="body2">
          Seleccione el tipo de dato que desea buscar
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "3em",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
              flexGrow: "1",
            }}
          >
            {metricStatus.map((metric, index) => {
              return (
                <Box
                  key={`${metricStatus[index]}-${index}`}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Autocomplete
                    sx={{ width: "100%" }}
                    onChange={(e, value) =>
                      handleMetricsDimensionChange(value, "metrics", index)
                    }
                    value={metricStatus[index]}
                    options={metrics?.map((metric) => {
                      return metric?.label ? metric?.label : "";
                    })}
                    renderInput={(params) => (
                      <TextField {...params} label="Metricas" />
                    )}
                  />
                  <DeleteIcon
                    cursor="pointer"
                    onClick={() => deleteMetricDimensions(index, "metrics")}
                  />
                </Box>
              );
            })}
            <Box
              sx={{
                backgroundColor: "#fd611a",
                width: "80px",
                borderRadius: "10px",
              }}
            >
              <Button
                onClick={() => setMetricStatus([...metricStatus, null])}
                sx={{ color: "white" }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
              flexGrow: "1",
            }}
          >
            {dimensionStatus.map((dimension, index) => {
              return (
                <Box
                  key={`${dimensionStatus[index]}-${index}`}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <DeleteIcon
                    cursor="pointer"
                    onClick={() => deleteMetricDimensions(index, "dimensions")}
                  />
                  <Autocomplete
                    sx={{ width: "100%" }}
                    onChange={(e, value) =>
                      handleMetricsDimensionChange(value, "dimensions", index)
                    }
                    value={dimensionStatus[index]}
                    options={dimensions?.map((dimension) => {
                      return dimension?.label ? dimension?.label : "";
                    })}
                    renderInput={(params) => (
                      <TextField {...params} label="Dimensiones" />
                    )}
                  />
                </Box>
              );
            })}
            <Box
              sx={{
                backgroundColor: "#fd611a",
                width: "80px",
                borderRadius: "10px",
              }}
            >
              <Button
                onClick={() => setDimensionStatus([...dimensionStatus, null])}
                sx={{ color: "white" }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: "#fd611a", borderRadius: "10px" }}>
          <Button fullWidth onClick={handleSubmit}>
            <Typography variant="body1" color="white">
              Buscar datos
            </Typography>
          </Button>
        </Box>
        {!showRealtime && (
          <Box sx={{ backgroundColor: "#fd611a", borderRadius: "10px" }}>
            <Button
              fullWidth
              onClick={() => {
                setShowRealtime(true);
                setOpen(false);
              }}
            >
              <Typography variant="body1" color="white">
                Volver a en tiempo real
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Config;
