import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";

const LoginModal = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log({ ...user, [name]: value });
  };

  const handleClick = () => {
    setIsEmailVerified(true);
  };

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  return (
    <>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5">Iniciar sesión</Typography>
          {!isEmailVerified ? (
            <FormControl
              fullWidth
              sx={{ alignItems: "center", textAlign: "center" }}
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.email}
                onChange={handleChange}
                name="email"
              />
              <Button
                variant="contained"
                sx={{ width: "20%" }}
                onClick={handleClick}
              >
                Continuar
              </Button>
            </FormControl>
          ) : (
            <FormControl
              fullWidth
              sx={{ alignItems: "center", textAlign: "center" }}
            >
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
              <Button variant="contained">Iniciar sesión</Button>
            </FormControl>
          )}
          <Typography>No tienes cuenta, registrate</Typography>
          <Button variant="contained">Registrarse</Button>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;
