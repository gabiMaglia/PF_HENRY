//Material UI
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Box,
} from "@mui/material";
// import Textarea from "@mui/joy/Textarea";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
//SWAL ALERT 2
import Swal from "sweetalert2";
// HOOKS
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import { createNewService } from "../../services/serviceServices";
import { getUsersByRole } from "../../services/userServices";
import PATHROUTES from "../../helpers/pathRoute";
import { createServiceValidate } from "../../helpers/serviceValidate";
import { handleImageUpload } from "../../utils/cloudinaryUpload";

const CreateService = () => {
  const fileInputRef = useRef(null); //Referencia a un archivo
  const navigate = useNavigate();

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  const [productInfo, setProductInfo] = useState({
    product_model: "",
    product_image: null,
    product_income_date: "",
    user_diagnosis: "",
    ClientId: "",
    technicianId: "",
  });

  const [users, setUsers] = useState([]);

  const [usersName, setUsersName] = useState([]);

  const [userListValue, setUserListValue] = useState(null);

  const [technicians, setTechnicians] = useState([]);

  const [techniciansName, setTechniciansName] = useState([]);

  const [technicianListValue, setTechnicianListValue] = useState(null);

  const [errors, setErrors] = useState({
    product_model: "",
    product_income_date: "",
    user_diagnosis: "",
    client: "",
    technician: "",
  });

  const handleCloudinaryUpload = async (folderName) => {
    // Función que sube la imagen a Cloudinary
    try {
      const file = fileInputRef.current.files;
      if (!file || file.length === 0) {
        return { error: true, response: "No se han seleccionado archivos" };
      }
      const newImage = await handleImageUpload(file[0], folderName);
      return newImage;
    } catch (error) {
      return { error: true, response: "Error al subir la imagen" };
    }
  };

  const resetForm = () => {
    // Función para resetear el componente
    setProductInfo({
      product_model: "",
      product_image: null,
      product_income_date: "",
      user_diagnosis: "",
    });
    setErrors({
      product_model: "",
      product_income_date: "",
      user_diagnosis: "",
      client: "",
      technician: "",
    });
    fileInputRef.current.value = "";
    setUserListValue(null);
    setTechnicianListValue(null);
  };

  const getUsers = async () => {
    // Función que obtiene los usuarios y tecnicos
    const users = await getUsersByRole("customer", authData.jwt);
    if (users.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error al obtener los usuarios",
        text: `${users.data.message}`,
      });
    } else {
      setUsers(users.data);
      if (authData.userRole === "admin") {
        const technicians = await getUsersByRole("technician", authData.jwt);
        if (technicians.error) {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error al obtener los tecnicos",
            text: `${users.data.message}`,
          });
        } else {
          setTechnicians(technicians.data);
        }
      }
    }
  };

  const getNameUsers = () => {
    // Función que guarda los nombres de usuarios y tecnicos
    if (users) {
      const nameUsers = users.map(
        (user) => user.name + " " + user.surname + " --- " + user.email
      );
      setUsersName(nameUsers);
    }
    if (technicians) {
      const nameTechnicians = technicians.map(
        (technician) =>
          technician.name +
          " " +
          technician.surname +
          " --- " +
          technician.email
      );
      setTechniciansName(nameTechnicians);
    }
  };

  const handleSubmit = async () => {
    // Función de carga
    const actErrors = createServiceValidate(productInfo, setErrors, errors); // Valida los campos
    Swal.fire({
      icon: "info",
      allowOutsideClick: false,
      title: "Por favor espere mientras procesamos la información",
      showConfirmButton: false,
    });
    Swal.showLoading();

    const imageUrl = await handleCloudinaryUpload("services"); // Sube la imagen a cloudinary
    if (imageUrl.error) {
      Swal.fire({
        icon: "error",
        title: "Error al subir la imagen a Cloudinary",
        text: imageUrl.response,
      });
    } else {
      authData.userRole === "technician" && (actErrors.technician = "");
      if (
        actErrors.product_model === "" &&
        actErrors.product_income_date === "" &&
        actErrors.user_diagnosis === "" &&
        actErrors.client === "" &&
        actErrors.technician === ""
      ) {
        let response = undefined;
        if (authData.userRole === "admin") {
          response = await createNewService(
            //Crea el servicio si es admin
            productInfo,
            productInfo.technicianId,
            imageUrl
          );
        } else if (authData.userRole === "technician") {
          response = await createNewService(
            // Crea el servicio si es tecnico
            productInfo,
            authData.userId,
            imageUrl
          );
        }
        if (!response.error && response.status === 200) {
          // Exito
          Swal.fire({
            showCancelButton: authData.userRole === "technician",
            icon: "success",
            title: "Servicio creado exitosamente",
            text:
              authData.userRole === "technician" &&
              "Para continuar con la reparación diríjase a: Productos en servicio",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#fd611a",
            cancelButtonText: "Quedarse en el formulario",
          }).then((value) => {
            if (value.isConfirmed) {
              navigate(
                authData.userRole === "admin"
                  ? PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.SERVICE_CREATE
                  : PATHROUTES.TECHNICIAN_USER_PANEL +
                      PATHROUTES.PRODUCTS_SERVICES
              );
            }
            resetForm();
          });
        } else {
          //Falla en creacion
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error en la creación del servicio",
            text: `${response.response.data}`,
          });
        }
      } else {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Error en la creación del servicio",
          text: "Por favor revise los campos del formulario",
        });
      }
    }
  };

  const handleChange = async (e) => {
    // Función que maneja los estados
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
    createServiceValidate({ [name]: value }, setErrors, errors);
  };

  const handleUserChange = (e) => {
    // Función que maneja los cambios de clientes o tecnicos
    const { outerText, id } = e.target;
    if (outerText && outerText.length > 0) {
      const email = outerText.split(" --- ")[1];
      if (id && id.includes("technician")) {
        setTechnicianListValue(outerText);
        createServiceValidate({ technician: outerText }, setErrors, errors);
        const technicianId = technicians.find(
          (technician) => technician.email === email
        ).id;
        setProductInfo({ ...productInfo, technicianId: technicianId });
      } else {
        createServiceValidate({ client: outerText }, setErrors, errors);
        setUserListValue(outerText);
        const userId = users.find((user) => user.email === email).id;
        setProductInfo({ ...productInfo, ClientId: userId });
      }
    } else {
      setUserListValue(null);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getNameUsers();
  }, [users, technicians]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ mt: "1%", color: "#fd611a" }}>
        Creación de un servicio
      </Typography>
      <Typography>
        Para cargar el sevicio de un dispositivo complete el siguiente
        formulario
      </Typography>
      <FormControl
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <TextField
            fullWidth
            error={Boolean(errors.product_model)}
            label="Modelo del producto"
            value={productInfo.product_model}
            variant="outlined"
            name="product_model"
            onChange={handleChange}
          />
          <FormHelperText error={true}>{errors.product_model}</FormHelperText>
        </Box>
        <Box>
          <TextField
            accept="image/*"
            fullWidth
            inputRef={fileInputRef}
            type="file"
            label="Imagen del producto"
            variant="outlined"
            name="product_image"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            error={Boolean(errors.product_income_date)}
            label="Dia de ingreso"
            value={productInfo.product_income_date}
            type="date"
            name="product_income_date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChange}
          />
          <FormHelperText error={true}>
            {errors.product_income_date}
          </FormHelperText>
        </Box>
        {authData.userRole === "admin" && (
          <Box>
            <Autocomplete
              id={"technician"}
              selectOnFocus
              onChange={handleUserChange}
              value={technicianListValue}
              options={techniciansName}
              renderInput={(params) => (
                <TextField
                  error={Boolean(errors.technician)}
                  name="technician"
                  {...params}
                  label="Tecnico a asignar"
                />
              )}
            />
            <FormHelperText error={true}>{errors.technician}</FormHelperText>
          </Box>
        )}
        <Box>
          <Autocomplete
            id={"user"}
            selectOnFocus
            onChange={handleUserChange}
            value={userListValue}
            options={usersName}
            renderInput={(params) => (
              <TextField
                error={Boolean(errors.client)}
                name="user"
                {...params}
                label="Usuario"
              />
            )}
          />
          <FormHelperText error={true}>{errors.client}</FormHelperText>
        </Box>
        <Box>
          <TextareaAutosize
            error={Boolean(errors.user_diagnosis)}
            value={productInfo.user_diagnosis}
            name="user_diagnosis"
            variant="outlined"
            minRows={3}
            placeholder="Diagnóstico del usuario"
            onChange={handleChange}
          />
          <FormHelperText error={true}>{errors.user_diagnosis}</FormHelperText>
        </Box>
        <Box sx={{ borderRadius: 2, backgroundColor: "#fd611a" }}>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="outlined"
            color="inherit"
            fullWidth
            sx={{ color: "white" }}
          >
            Registrar servicio
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default CreateService;
