import {
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CancelIcon from "@mui/icons-material/Cancel";

const RegisterModal = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    address: "",
    confirmAddress: "",
    userName: "",
    phoneNumberAreaCode: "",
    phoneNumber: "",
    name: "",
    surname: "",
    dni: "",
    birrhdate: "",
  });

  const [errorsUser, setErrorsUser] = useState({
    email: "",
    address: [],
    confirmAddress: "",
    userName: "",
    phoneNumberAreaCode: [],
    phoneNumber: [],
    name: "",
    surname: "",
    dni: [],
    birrhdate: "",
  });

  const boxModalStyle = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: "1em",
  };

  const boxButtonStyle = {
    position: "relative",
    left: "35%",
    borderRadius: 2,
    backgroundColor: "#fd611a",
    minWidth: "100px",
    width: "30%",
    height: "20%",
    mb: "1em",
    mt: "2em",
  };

  return (
    <Modal
      sx={{ overflow: "scroll" }}
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {}}
    >
      <Box sx={boxModalStyle}>
        <CancelIcon sx={{ position: "fixed", top: ".5em", right: ".5em" }} />
        <Typography variant="h4">Registrarse</Typography>
        <Typography
          variant="body1"
          sx={{ color: "#fd611a", mt: ".5em" }}
        >
          Para crear una cuenta ingresá tus datos
        </Typography>
        <FormControl
          fullWidth
          sx={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1em",
            mt: "2em",
          }}
        >
          <TextField
            sx={{ minWidth: "100px", flexGrow: "1" }}
            label="Nombre/s"
            variant="outlined"
          />
          <TextField
            sx={{ minWidth: "100px", flexGrow: "1" }}
            label="Apellido/s"
            variant="outlined"
          />
          <TextField
            sx={{ minWidth: "100px", flexGrow: "1" }}
            label="Nombre de usuario"
            variant="outlined"
          />
          <TextField
            sx={{ minWidth: "100px", flexGrow: "1" }}
            label="Fecha de nacimiento"
            type="date"
            variant="outlined"
          />
          <TextField
            sx={{ width: "100%" }}
            label="DNI"
            type="number"
            variant="outlined"
          />
          <TextField
            sx={{ minWidth: "100px", flexGrow: "1" }}
            label="Contraseña"
            variant="outlined"
            type="password"
          />
          <TextField
            sx={{ minWidth: "100px", flexGrow: "1" }}
            label="Confirmación de contraseña"
            variant="outlined"
            type="password"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Email"
            variant="outlined"
          />
          <TextField
            sx={{ minWidth: "100px", flex: "1/3" }}
            label="Codigo de area"
            variant="outlined"
          />
          <TextField
            sx={{ minWidth: "100px", flexGrow: "1" }}
            label="Numero de telefono"
            variant="outlined"
          />
        </FormControl>
        <Box sx={boxButtonStyle}>
          <Button
            color="inherit"
            fullWidth
            sx={{ color: "white" }}
            onClick={() => {}}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
