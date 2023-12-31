//HOKKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
//MATERIAL UI
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  CardMedia,
  Divider,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CancelIcon from "@mui/icons-material/Cancel";
//STYLES
import "./alertStyles.min.css";
//HELPERS
import { userLoginValidate } from "../../helpers/userValidate";
//REDUX
import { logUser } from "../../redux/slices/userSlice";
//SERVICES
import { googleLoginUser, loginUser } from "../../services/authServices";
import { getUserById } from "../../services/userServices";
//SWEET ALERT
import Swal from "sweetalert2";
import { rejectCookies } from "../../redux/slices/cookiesSlice";
import { fetchGetProduct } from "../../services/productServices";
import { addItem } from "../../redux/slices/cartSlice";

const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_V3;

const LoginModal = ({
  isOpen,
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
}) => {
  const dispatch = useDispatch();
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const cookiesAccepted = useSelector((state) => state.cookies);

  const handledispatch = async (userId) => {
    await getUserById(userId).then((data) => {
      dispatch(logUser({ userObject: data }));
    });
    await dispatch(fetchGetProduct(cookiesAccepted));
    dispatch(addItem());
  };

  const loginManagement = async (username, address, cookieStatus) => {
    let response;

    if (!username || !address) {
      response = await googleLoginUser(cookieStatus);
    } else {
      response = await loginUser(username, address, cookieStatus);
    }
    !cookieStatus && rejectCookies();
    if (response.error) {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "error",
        title: "Fallo en el inicio de sesion",
        text: `${response.error.data.response || response.error.data}`,
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "success",
        title: "Inicio de sesion correcto",
        confirmButtonColor: "#fd611a",
      }).then((result) => {
        if (result.isConfirmed) {
          handledispatch(response.data.userId);
          setLoginModalIsOpen(false);
        }
      });
    }
  };

  // Estilos del contenedor principal
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
  };

  // Estilos generales de los botones
  const boxButtonStyle = {
    borderRadius: 2,
    backgroundColor: "#fd611a",
    minWidth: "100px",
    width: "30%",
    height: "10%",
    mb: "1em",
    mt: "1em",
  };

  // Estado para el manejo del formulario de inicio de sesión
  const [user, setUser] = useState({
    username: "",
    address: "",
  });

  const [isUsernameVerified, setIsUsernameVerified] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    address: "",
  });

  // Función para manejar el cambio de estado del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    userLoginValidate({ [name]: value }, setErrors, errors);
  };

  // Función para manejar la verificación del nombre de usuario
  const usernameVerification = () => {
    userLoginValidate({ username: user.username }, setErrors, errors);
    if (!errors.username && user.username.length !== 0) {
      setIsUsernameVerified(true);
    } else {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "error",
        title: "Nombre de usuario invalido",
        text: errors.username,
      });
    }
  };

  const handleSubmit = async () => {
    userLoginValidate({ address: user.address }, setErrors, errors);
    if (!errors.address) {
      //Funcionalidad en caso de inicio correcto
      loginManagement(user.username, user.address, cookieStatus);
      resetModal();
      setLoginModalIsOpen(false);
    } else {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "error",
        title: "Contraseña invalida",
        text: errors.address,
      });
    }
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
    setIsUsernameVerified(false);
    setUser({
      username: "",
      address: "",
    });
    setErrors({
      username: "",
      address: "",
    });
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        setLoginModalIsOpen(false);
      }}
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
            onClick={() => {
              setLoginModalIsOpen(false);
            }}
          />
        </Button>

        <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey} language="es">
          {!isUsernameVerified ? (
            <FormControl
              fullWidth
              sx={{
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" sx={{ mb: 4 }}>
                Iniciar sesión
              </Typography>
              <Typography variant="body1" sx={{ color: "#fd611a" }}>
                Para continuar ingresá tu nombre de usuario
              </Typography>
              <TextField
                label="Nombre de usuario"
                error={Boolean(errors.username)}
                helperText={errors.username}
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.username}
                onChange={handleChange}
                name="username"
              />
              {renderButton("Continuar", usernameVerification)}
              <Divider
                sx={{
                  width: "100%",
                  color: "black",
                  mb: ".5em",
                  fontWeight: "600",
                }}
              >
                O
              </Divider>

              <Typography variant="body1">Inicia sesion con: </Typography>
              <CardMedia
                onClick={() => {
                  loginManagement(null, null, cookieStatus);
                }}
                sx={{
                  cursor: "pointer",
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

              {renderButton("Registrarse", () => {
                setLoginModalIsOpen(false);
                setRegisterModalIsOpen(true);
              })}
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
                  padding: "0px",
                  color: "black",
                  position: "fixed",
                  width: ".01px",
                  height: ".01px",
                  top: "1.8em",
                  left: ".5em",
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
                {user.username}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fd611a", mt: "2em" }}>
                Ingresá tu contraseña
              </Typography>
              <TextField
                error={Boolean(errors.address)}
                name="address"
                type="password"
                label="Contraseña"
                helperText={errors.address}
                variant="outlined"
                fullWidth
                value={user.address}
                onChange={handleChange}
                margin="normal"
              />
              {renderButton("Iniciar sesion", handleSubmit)}
            </FormControl>
          )}
        </GoogleReCaptchaProvider>
      </Box>
    </Modal>
  );
};

export default LoginModal;
