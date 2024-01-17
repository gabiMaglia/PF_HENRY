import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import { changeUserPassword } from "../../../services/authServices";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { userChangePasswordValidate } from "../../../helpers/userValidate";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordsError, setPasswordsError] = useState({
    password: [],
    confirmPassword: "",
  });
  const { token } = useParams();

  const boxStyle = {
    width: "50%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    margin: "auto",
    textAlign: "center",
    mt: "5em",
  };

  const buttonStyle = {
    borderRadius: 2,
    backgroundColor: "#fd611a",
    minWidth: "100px",
    marginInline: "auto",
    width: "30%",
    mb: "1em",
    mt: "2em",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords({ ...passwords, [name]: value });
    if (name === "confirmPassword") {
      userChangePasswordValidate(
        { ...passwords, [name]: value },
        setPasswordsError,
        passwordsError
      );
    } else {
      userChangePasswordValidate(
        { password: value },
        setPasswordsError,
        passwordsError
      );
    }
  };

  const handleSubmit = async () => {
    Swal.fire({
      icon: "info",
      title: "Por favor espere mientras procesamos la información",
      showConfirmButton: false,
    });
    Swal.showLoading();
    const actErrors = userChangePasswordValidate(
      passwords,
      setPasswordsError,
      passwordsError
    );
    if (
      actErrors?.password?.length > 0 ||
      actErrors?.confirmPassword?.length > 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Por favor revise los campos del formulario",
        confirmButtonColor: "#fd611a",
        confirmButtonText: "Ok",
      });
    } else {
      const response = await changeUserPassword(
        passwords.password,
        passwords.confirmPassword,
        token
      );
      if (!response.error) {
        await Swal.fire({
          icon: "success",
          title: "Contrasena actualizada!",
          text: `Puede volver a iniciar sesion con la nueva contraseña`,
          confirmButtonColor: "#fd611a",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/");
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Disculpe, hubo un error durante el proceso. Intentelo denuevo mas tarde`,
          confirmButtonText: "Ok",
        });
      }
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
        error={passwordsError.password.length > 0}
        onChange={handleChange}
        value={passwords.password}
      />
      {passwordsError.password.map((error, key) => {
        return (
          <FormHelperText sx={{ fontSize: ".6em" }} key={key} error={true}>
            {error}
          </FormHelperText>
        );
      })}
      <TextField
        sx={{
          width: "100%",
          mt: "1em",
        }}
        label="Confirmar Contraseña"
        variant="outlined"
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        value={passwords.confirmPassword}
        error={Boolean(passwordsError.confirmPassword)}
      />
      <FormHelperText sx={{ fontSize: ".6em" }} error={true}>
        {passwordsError.confirmPassword}
      </FormHelperText>
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
