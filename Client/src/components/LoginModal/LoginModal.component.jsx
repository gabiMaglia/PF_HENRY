import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  CardMedia,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const LoginModal = ({ isOpen, closeModal }) => {
  // Estilos del contenedor principal
  const boxModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: "1em",
  };

  // Estilos generales de los botones
  const boxButtonStyle = {
    borderRadius: 2,
    backgroundColor: "#fd611a",
    width: "30%",
    height: "10%",
    mb: "1em",
    mt: ".5em",
  };

  // Estado para el manejo del formulario de inicio de sesión
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Función para manejar el cambio de estado del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Función para manejar la verificación del email
  const emailVerification = () => {
    setIsEmailVerified(true);
  };

  // Función para renderizar los botones
  const renderButton = (text, functionOnClick) => {
    return (
      <Box sx={boxButtonStyle}>
        <Button
          color="inherit"
          fullWidth
          sx={{ color: "white" }}
          onClick={functionOnClick}
        >
          {text}
        </Button>
      </Box>
    );
  };

  // Reseteo del modal
  const resetModal = () => {
    setIsEmailVerified(false);
    setUser({
      email: "",
      password: "",
    });
  };

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        closeModal(false);
      }}
    >
      <Box sx={boxModalStyle}>
        {!isEmailVerified ? (
          <FormControl
            fullWidth
            sx={{ alignItems: "center", textAlign: "center" }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 4 }}
            >
              Iniciar sesión
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#fd611a" }}
            >
              Para continuar ingresá tu email
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleChange}
              name="email"
            />
            {renderButton("Continuar", emailVerification)}
            <Typography
              variant="h5"
              sx={{ mb: ".5em" }}
            >
              O
            </Typography>
            <Typography variant="body1">Inicia sesion con: </Typography>
            <CardMedia
              sx={{
                maxWidth: "2.5em",
                maxHeight: "2.5em",
                mt: ".5em",
                mb: "2em",
              }}
              component="img"
              alt="Google"
              image="/icons/googleIcon.png"
            />
            <Typography>No tienes cuenta? Regístrate.</Typography>

            {renderButton("Registrarse", emailVerification)}
          </FormControl>
        ) : (
          <FormControl
            fullWidth
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button
              sx={{
                color: "black",
                width: "0.1em",
                height: ".1em",
                position: "fixed",
                top: "3em",
                left: "1em",
              }}
              onClick={resetModal}
            >
              <ArrowBackIosIcon />
            </Button>
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                mb: 4,
              }}
            >
              Iniciar sesión
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ backgroundColor: "grey", p: ".5em", borderRadius: "3em" }}
            >
              {user.email}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#fd611a", mt: "2em" }}
            >
              Ingresá tu contraseña
            </Typography>
            <TextField
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={user.password}
              onChange={handleChange}
              margin="normal"
            />
            {renderButton("Iniciar sesion", emailVerification)}
          </FormControl>
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;
