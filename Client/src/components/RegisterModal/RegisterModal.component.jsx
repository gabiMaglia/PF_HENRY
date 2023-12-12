import {
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { userRegisterValidate } from "../../helpers/userValidate";
import Swal from "sweetalert2";

const RegisterModal = ({ isOpen, setRegisterModalIsOpen }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    address: "",
    confirmAddress: "",
    username: "",
    phoneNumberAreaCode: "",
    phoneNumber: "",
    name: "",
    surname: "",
    dni: "",
    birthdate: "",
    role: "customer",
  });

  const [errorsUser, setErrorsUser] = useState({
    email: "",
    address: [],
    confirmAddress: "",
    username: "",
    phoneNumberAreaCode: [],
    phoneNumber: [],
    name: "",
    surname: "",
    dni: [],
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
    mt: "2em",
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
    if (name === "confirmAddress") {
      userRegisterValidate(
        {
          address: userInfo.address,
          [name]: value,
        },
        setErrorsUser,
        errorsUser
      );
    } else if (name === "address") {
      userRegisterValidate(
        {
          confirmAddress: userInfo.confirmAddress,
          [name]: value,
        },
        setErrorsUser,
        errorsUser
      );
    } else {
      userRegisterValidate({ [name]: value }, setErrorsUser, errorsUser);
    }
  };

  const handleSubmit = () => {
    userRegisterValidate(userInfo, setErrorsUser);
    if (
      !errorsUser.email &&
      errorsUser.address.length === 0 &&
      !errorsUser.confirmAddress &&
      !errorsUser.username &&
      errorsUser.phoneNumberAreaCode.length === 0 &&
      errorsUser.phoneNumber.length === 0 &&
      !errorsUser.name &&
      !errorsUser.surname &&
      errorsUser.dni.length === 0
    ) {
      // A realizar en caso de registro exitoso
    } else {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "error",
        title: "Error/es en el formulario",
        html: `<div>          
        ${errorsUser.email ? "Revise el email <br/>" : ""}</li>
      
        ${errorsUser.address.length > 0 ? "Revise la contraseña <br/>" : ""}
        ${
          errorsUser.confirmAddress
            ? "Revise la confirmación de la contraseña <br/>"
            : ""
        }
        ${errorsUser.username ? "Revise el nombre de usuario <br/>" : ""}
        ${
          errorsUser.phoneNumberAreaCode.length > 0
            ? "Revise el codigo de area <br/>"
            : ""
        }
        ${errorsUser.phoneNumber.length > 0 ? "Revise el telefono <br/>" : ""}
        ${errorsUser.name ? "Revise el nombre <br/>" : ""}
        ${errorsUser.surname ? "Revise el apellido <br/>" : ""}
        ${errorsUser.dni.length > 0 ? `Revise el DNI <br/>` : ""}
        <div>`,
      });
    }
  };

  const resetModal = () => {
    setRegisterModalIsOpen(false);
    setUserInfo({
      email: "",
      address: "",
      confirmAddress: "",
      username: "",
      phoneNumberAreaCode: "",
      phoneNumber: "",
      name: "",
      surname: "",
      dni: "",
      birthdate: "",
      role: "customer",
    });
    setErrorsUser({
      email: "",
      address: [],
      confirmAddress: "",
      username: "",
      phoneNumberAreaCode: [],
      phoneNumber: [],
      name: "",
      surname: "",
      dni: [],
    });
  };

  return (
    <Modal
      sx={{ overflow: "scroll" }}
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={resetModal}
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
            onClick={resetModal}
            sx={{ position: "fixed", top: ".5em", right: ".5em" }}
          />
        </Button>
        <Typography variant="h4">Registrarse</Typography>
        <Typography
          variant="body1"
          sx={{ color: "#fd611a", mt: ".5em" }}
        >
          Para crear una cuenta ingresá tus datos
        </Typography>
        <FormControl
          onSubmit={handleSubmit}
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
          <Box sx={{ minWidth: "100px", flexGrow: "1" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Nombre/s"
              variant="outlined"
              name="name"
              onChange={handleChange}
              value={userInfo.name}
              error={Boolean(errorsUser.name)}
            />
            <FormHelperText
              sx={{ fontSize: ".6em" }}
              error={true}
            >
              {errorsUser.name}
            </FormHelperText>
          </Box>
          <Box sx={{ minWidth: "100px", flexGrow: "1" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Apellido/s"
              variant="outlined"
              name="surname"
              onChange={handleChange}
              value={userInfo.surname}
              error={Boolean(errorsUser.surname)}
            />
            <FormHelperText
              error={true}
              sx={{ fontSize: "0.6em" }}
            >
              {errorsUser.surname}
            </FormHelperText>
          </Box>
          <Box sx={{ minWidth: "100px", flexGrow: "1" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Nombre de usuario"
              variant="outlined"
              name="username"
              onChange={handleChange}
              value={userInfo.username}
              error={Boolean(errorsUser.username)}
            />
            <FormHelperText
              error={true}
              sx={{ fontSize: "0.6em" }}
            >
              {errorsUser.username}
            </FormHelperText>
          </Box>
          <Box sx={{ minWidth: "100px", flexGrow: "1" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Fecha de nacimiento"
              type="date"
              variant="outlined"
              name="birthdate"
              onChange={handleChange}
              value={userInfo.birthdate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              label="DNI"
              type="number"
              variant="outlined"
              name="dni"
              onChange={handleChange}
              value={userInfo.dni}
              error={errorsUser.dni.length > 0}
            />
            {errorsUser.dni.map((error, key) => {
              return (
                <FormHelperText
                  sx={{ fontSize: ".6em" }}
                  key={key}
                  error={true}
                >
                  {error}
                </FormHelperText>
              );
            })}
          </Box>
          <Box sx={{ minWidth: "100px", flexGrow: "1" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Contraseña"
              variant="outlined"
              type="password"
              name="address"
              onChange={handleChange}
              value={userInfo.address}
              error={errorsUser.address.length > 0}
            />
            {errorsUser.address.map((error, key) => {
              return (
                <FormHelperText
                  sx={{ fontSize: ".6em" }}
                  key={key}
                  error={true}
                >
                  {error}
                </FormHelperText>
              );
            })}
          </Box>
          <Box sx={{ minWidth: "100px", flexGrow: "1" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Confirmación de contraseña"
              variant="outlined"
              type="password"
              name="confirmAddress"
              onChange={handleChange}
              value={userInfo.confirmAddress}
              error={Boolean(errorsUser.confirmAddress)}
            />
            <FormHelperText
              sx={{ fontSize: ".6em" }}
              error={true}
            >
              {errorsUser.confirmAddress}
            </FormHelperText>
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              value={userInfo.email}
              helperText={errorsUser.email}
              error={Boolean(errorsUser.email)}
            />
          </Box>
          <Box sx={{ minWidth: "100px", flex: "1/3" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Codigo de area"
              variant="outlined"
              name="phoneNumberAreaCode"
              onChange={handleChange}
              value={userInfo.phoneNumberAreaCode}
              error={errorsUser.phoneNumberAreaCode.length > 0}
            />
            {errorsUser.phoneNumberAreaCode.map((error, key) => {
              return (
                <FormHelperText
                  sx={{ fontSize: "0.6em" }}
                  key={key}
                  error={true}
                >
                  {error}
                </FormHelperText>
              );
            })}
          </Box>
          <Box sx={{ minWidth: "100px", flexGrow: "1" }}>
            <TextField
              sx={{ width: "100%" }}
              label="Numero de telefono"
              variant="outlined"
              name="phoneNumber"
              onChange={handleChange}
              value={userInfo.phoneNumber}
              error={errorsUser.phoneNumber.length > 0}
            />
            {errorsUser.phoneNumber.map((error, key) => {
              return (
                <FormHelperText
                  key={key}
                  error={true}
                >
                  {error}
                </FormHelperText>
              );
            })}
          </Box>
        </FormControl>
        <Box sx={boxButtonStyle}>
          <Button
            onClick={handleSubmit}
            type="submit"
            color="inherit"
            fullWidth
            sx={{ color: "white" }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
