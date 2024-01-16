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

const boxModalStyle = {
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

  const deleteMetric = (index) => {
    if (metricStatus.length > 1) {
      let newData = [...metricStatus];
      newData.splice(index, 1);
      setMetricStatus(newData);
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
                    onClick={() => deleteMetric(index)}
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

          <Autocomplete
            sx={{ flexGrow: "1" }}
            value={dimensionStatus[0]}
            name="dimensions"
            onChange={(e, value) =>
              handleMetricsDimensionChange(value, "dimensions", 0)
            }
            options={dimensions?.map((dimension) => {
              return dimension?.label ? dimension?.label : "";
            })}
            renderInput={(params) => (
              <TextField {...params} label="Dimensiones" />
            )}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "3em",
            justifyContent: "center",
          }}
        ></Box>
        <Box>
          <Box sx={{ backgroundColor: "#fd611a" }}>
            <Button
              fullWidth
              onClick={() => {
                getData();
              }}
            >
              <Typography variant="body1" color="white">
                Buscar datos
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Config;
