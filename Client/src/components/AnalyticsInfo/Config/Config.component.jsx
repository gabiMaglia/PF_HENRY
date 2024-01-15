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

const boxModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "1em",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

const Config = ({ open, setOpen, getData, config, setConfig }) => {
  const handleMetricsDimensionChange = (value, name) => {
    setConfig({ ...config, [name]: value });
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
          <Autocomplete
            sx={{ flexGrow: "1" }}
            onChange={(e, value) =>
              handleMetricsDimensionChange(value, "metrics")
            }
            value={config.metrics}
            options={metrics?.map((metric) => {
              return metric?.label ? metric?.label : "";
            })}
            renderInput={(params) => <TextField {...params} label="Metricas" />}
          />
          <Autocomplete
            sx={{ flexGrow: "1" }}
            value={config.dimensions}
            name="dimensions"
            onChange={(e, value) =>
              handleMetricsDimensionChange(value, "dimensions")
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
