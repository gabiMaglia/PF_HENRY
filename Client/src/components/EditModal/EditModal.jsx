import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { userEditValidate } from "../../helpers/userValidate";
import Swal from "sweetalert2";
import "./alertStyles.min.css";

const EditModal = ({
  isOpen,
  setIsOpen,
  dataName,
  previousValue,
  dataList,
}) => {
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
    height: "auto",
    maxHeight: "85%",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
  };

  const obteinData = (info) => {
    const data = dataList.map((data) => {
      return [data.en, ""];
    });
    return Object.fromEntries(data);
  };

  const [userData, setUserData] = useState(obteinData(dataList));
  const [errors, setErrors] = useState(obteinData(dataList));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    userEditValidate({ [name]: value }, setErrors, errors);
  };

  const resetModal = () => {
    setIsOpen(false);
    setUserData("");
    setErrors([]);
  };

  const handleSubmit = (e) => {
    const actualErrors = userEditValidate(userData, setErrors, errors);
    let containErrors = false;
    const errorsKeys = Object.keys(actualErrors);
    const errorsValues = Object.values(actualErrors);
    errorsValues.forEach((error) => {
      if (typeof error === "object") {
        error.length > 0 ? (containErrors = true) : "";
      } else {
        error !== "" ? (containErrors = true) : "";
      }
    });
    if (containErrors) {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "error",
        title: "Error/es en el formulario",
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "success",
        title: "Los datos ingresados son validos",
        text: "Estas seguro que quieres modificar la información",
        confirmButtonText: "Modificar",
        confirmButtonColor: "#fd611a",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
        customClass: {
          container: "container",
        },
      }).then((result) => {
        // Verifica si se hizo clic en Aceptar
        if (result.isConfirmed) {
          //   loginUser(userInfo.username, userInfo.address);
          //   handledispatch(response.data.data.id);
          resetModal();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          //   resetModal();
        }
      });
    }
  };

  const formRender = () => {
    return dataList.map((data) => {
      return (
        <>
          <TextField
            fullWidth
            margin="normal"
            key={data.en}
            type={
              data.en === "email"
                ? "email"
                : data.en === "birthdate"
                ? "date"
                : data.en === "phoneNumber" ||
                  data.en === "phoneNumberAreaCode" ||
                  data.en === "number" ||
                  data.en === "dni"
                ? "number"
                : "text"
            }
            InputLabelProps={
              data.en === "birthdate"
                ? {
                    shrink: true,
                  }
                : ""
            }
            name={data.en}
            label={data.es}
            variant="outlined"
            onChange={handleChange}
            value={userData[data.en]}
            error={
              typeof errors[data.en] === "object"
                ? errors[data.en].length > 0
                : errors[data.en] !== ""
            }
          />
          <FormHelperText
            error={true}
            sx={{ fontSize: "0.6em" }}
          >
            {typeof errors[data.en] !== "object"
              ? errors[data.en]
              : errors[data.en].map((error, key) => {
                  return (
                    <Typography
                      variant="p"
                      key={key}
                    >
                      {error}
                      <br />
                    </Typography>
                  );
                })}
          </FormHelperText>
        </>
      );
    });
  };

  return (
    <Modal
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
            sx={{
              position: "fixed",
              top: ".5em",
              right: ".5em",
            }}
            onClick={resetModal}
          />
        </Button>
        <Typography variant="h6">Editar {dataName}</Typography>
        {typeof previousValue === "object" ? (
          ""
        ) : (
          <Typography variant="h5">{previousValue}</Typography>
        )}
        <Typography
          variant="body1"
          sx={{ color: "#fd611a" }}
        >
          Para continuar ingresá tus datos actualizados
        </Typography>
        <FormControl
          fullWidth
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {formRender()}
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: "#fd611a",
              minWidth: "100px",
              width: "30%",
              height: "10%",
              mb: "1em",
              mt: "1em",
            }}
          >
            <Button
              color="inherit"
              fullWidth
              sx={{ color: "white" }}
              onClick={handleSubmit}
            >
              Modificar
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default EditModal;
