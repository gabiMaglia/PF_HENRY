import { Modal, Box, Typography, FormControl, TextField } from "@mui/material";
import { useState } from "react";

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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: "1em",
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {}}
    >
      <Box sx={boxModalStyle}>
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
      </Box>
    </Modal>
  );
};

export default RegisterModal;
