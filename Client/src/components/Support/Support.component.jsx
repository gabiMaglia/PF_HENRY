//HOOKS
import { useState } from "react";
//MATERIAL UI
import { Box, TextField, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Textarea from "@mui/joy/Textarea";
//SWEET ALERT
import Swal from "sweetalert2";
//HELPERS
import {
  validateName,
  validatePhone,
  validateEmail,
  validateArea,
} from "../../helpers/supportValidateForm";
//UTILS
import { textSupport } from "../../utils/objectsTexts";

const SupportComponent = () => {
  // ESTADOS
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");

  //MANEJO DE ERRORES
  const [errorName, setErrorName] = useState({
    error: false,
    message: "",
  });
  const [errorPhone, setErrorPhone] = useState({
    error: false,
    message: "",
  });
  const [errorEmail, setErrorEmail] = useState({
    error: false,
    message: "",
  });
  const [errorArea, setErrorArea] = useState({
    error: false,
    message: "",
  });

  //HANDLES CHANGES
  const handleChangeName = (value) => {
    setName(value);
    setErrorName({
      error: !validateName(value),
      message: "El nombre debe tener al menos 3 caracteres",
    });
  };
  const handleChangePhone = (value) => {
    setPhone(value);
    setErrorPhone({
      error: !validatePhone(value),
      message: "El teléfono debe tener 10 dígitos",
    });
  };
  const handleChangeEmail = (value) => {
    setEmail(value);
    setErrorEmail({
      error: !validateEmail(value),
      message: "El correo electrónico no es válido",
    });
  };
  const handleChangeArea = (value) => {
    setArea(value);
    setErrorArea({
      error: !validateArea(value),
      message: "El mensaje debe tener al menos 10 caracteres",
    });
  };

  //HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validateName(name) ||
      !validatePhone(phone) ||
      !validateEmail(email) ||
      !validateArea(area)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hay errores en el formulario. Por favor reviselo.",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Mensaje Enviado",
      text: "Responderemos a la brevedad.",
    });
    setName("");
    setPhone("");
    setEmail("");
    setArea("");
  };

  return (
    <>
      {/* BOX TITULO SOPORTE */}
      <Box
        sx={{
          backgroundColor: "#000",
          width: "100%",
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#fff", textTransform: "uppercase", fontWeight: "800" }}
        >
          Soporte
        </Typography>
      </Box>
      {/* CIERRE BOX TITULO SOPORTE */}

      {/* BOX FORM Y CAJA TEXTO */}
      <Box sx={{ display: "flex", justifyContent: "center", margin: "0 auto" }}>
        {/* BOX FORM */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "50px",
            margin: "50px",
          }}
        >
          <TextField
            id="name"
            label="Nombre"
            type="string"
            variant="outlined"
            required={true}
            error={errorName.error}
            helperText={errorName.message}
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
          />
          <TextField
            id="phone"
            label="Teléfono"
            type="phone"
            variant="outlined"
            required={true}
            error={errorPhone.error}
            helperText={errorPhone.message}
            value={phone}
            onChange={(e) => handleChangePhone(e.target.value)}
            sx={{ margin: "20px 0" }}
          />
          <TextField
            id="email"
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            required={true}
            error={errorEmail.error}
            helperText={errorEmail.message}
            value={email}
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
          <Textarea
            disabled={false}
            minRows={4}
            size="lg"
            variant="outlined"
            required={true}
            error={errorArea.error}
            placeholder="Ejemplo: Tengo un CPU que no enciende. Queda la pantalla negra."
            value={area}
            onChange={(e) => handleChangeArea(e.target.value)}
            sx={{ margin: "20px 0" }}
          />
          {errorArea.error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ margin: "-15px 0 25px 15px", fontSize: "12px" }}
            >
              {errorArea.message}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#fd611a",
              padding: "12px 0",
              "&:hover": { backgroundColor: "#000" },
              fontSize: "18px",
            }}
            endIcon={<SendIcon />}
          >
            Enviar
          </Button>
        </Box>
        {/* CIERRE BOX FORM */}

        {/* BOX CAJA TEXTO */}
        <Box
          sx={{
            width: "40%",
            display: "flex",
            justifyContent: "center",
            padding: "50px",
            margin: "50px",
          }}
        >
          {textSupport.map((item, index) => (
            <Box key={index}>
              <Typography
                variant="h5"
                sx={{ marginBottom: "10px", fontWeight: "bold" }}
              >
                {item.title}
              </Typography>
              {item.content.map((paragraph, pIndex) => (
                <Typography key={pIndex} sx={{ marginBottom: "10px" }}>
                  {paragraph.text && <span>{paragraph.text}</span>}
                  {paragraph.textOne && (
                    <span style={{ fontWeight: "bold" }}>
                      {paragraph.textOne}
                    </span>
                  )}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
        {/* CIERRE BOX CAJA TEXTO */}
      </Box>
      {/* CIERRE BOX FORM Y CAJA TEXTO */}
    </>
  );
};

export default SupportComponent;
