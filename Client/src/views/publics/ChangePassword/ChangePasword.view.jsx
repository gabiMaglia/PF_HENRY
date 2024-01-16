import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { changeUserPassword } from "../../../services/authServices";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const ChangePassword = () => {
  const navigate = useNavigate()
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordsError, setPasswordsError] = useState({
    confirmPassword: "",
  });
  const { token } = useParams()
  console.log(token)




  const boxStyle = {
    width: "50%",
    height:'42vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    margin: "auto",
    textAlign: "center",
    mt: "5em",
  };

  const buttonStyle = {
    borderRadius: 2,
    backgroundColor: "#fd611a",
    minWidth: "100px",
    marginInline: 'auto',
    width: "30%",
    mb: "1em",
    mt: "2em",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });

    if (name === "confirmPassword") {
      setPasswordsError({
        confirmPassword: passwords.password !== value ? "Las contraseñas no coinciden" : "",
      });
    }
  };
  const handleSubmit = async () => {
    if (passwords.password === passwords.confirmPassword && passwords.password !== '' && passwords.confirmPassword !== '') {
       const password = passwords.password
       const confirmPassword = passwords.confirmPassword
        const response = await changeUserPassword(password, confirmPassword, token )
        if (!response.error){     
          await Swal.fire({
            icon: "success",
            title: "Contrasena actualizada!",
            text: `${response.data.data}`,
            confirmButtonText: "Ok",
          }).then(() => {
            navigate('/')
          })
        }else if(response.error) {
          await Swal.fire({
            icon: "error",
            title: "Error!",
            text: `${response.error}`,
            confirmButtonText: "Ok",
          })
        }
    } else {
      setPasswordsError({
        confirmPassword: "Error",
      });
    }
  };

  return (
    <Box sx={boxStyle}>
      <Typography variant="h4">Cambiar Contraseña</Typography>
      <TextField
        sx={{ width: "100%", mt: "1em" }}
        label="Nueva Contraseña"
        variant="outlined"
        type="password"
        name="password"
        onChange={handleChange}
        value={passwords.password}
      />
      <TextField
        sx={{
          width: "100%",
          mt: "1em",
          border: passwordsError.confirmPassword ? "1px solid #e57373" : "",
        }}
        label="Confirmar Contraseña"
        variant="outlined"
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        value={passwords.confirmPassword}
        error={Boolean(passwordsError.confirmPassword)}
        helperText={passwordsError.confirmPassword}
      />
      <Box sx={buttonStyle}>
        <Button
          onClick={handleSubmit}
          type="submit"
          color="inherit"
          fullWidth
          sx={{ color: "white" }}
        >
          Cambiar Contraseña
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
