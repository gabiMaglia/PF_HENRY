import {
  Autocomplete,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getAuthDataCookie } from "../../utils/cookiesFunctions";
import Textarea from "@mui/joy/Textarea";
import { createNewService } from "../../services/serviceServices";
import { getUsersByRole } from "../../services/userServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PATHROUTES from "../../helpers/pathRoute";

const CreateService = () => {
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    product_model: "",
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

  const authData = getAuthDataCookie("authData");
  const jwt = getAuthDataCookie("jwt");

  const resetForm = () => {
    setProductInfo({
      product_model: "",
      product_income_date: "",
      user_diagnosis: "",
      ClientId: "",
      technicianId: "",
    });
    setUserListValue(null);
    setTechnicianListValue(null);
  };

  const getUsers = async () => {
    const users = await getUsersByRole("customer", jwt);
    setUsers(users.data);
    if (authData.userRole === "admin") {
      const technicians = await getUsersByRole("technician", jwt);
      setTechnicians(technicians.data);
    }
  };

  const getNameUsers = () => {
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
    Swal.fire({
      icon: "info",
      allowOutsideClick: false,
      title: "Por favor espere mientras procesamos la información",
      showConfirmButton: false,
      customClass: {
        container: "container",
      },
    });
    Swal.showLoading();

    let response = undefined;
    if ((authData.userRole = "admin")) {
      response = await createNewService(productInfo, productInfo.technicianId);
    // } else if (authData.userRole === "technician") {
      response = await createNewService(productInfo, authData.userId);
    }
    if (response.status === 200) {
      Swal.fire({
        allowOutsideClick: false,
        showCancelButton: true,
        icon: "success",
        title: "Servicio creado exitosamente",
        text: "Para continuar con la reparación diríjase a: Productos en servicio",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#fd611a",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
      }).then((value) => {
        if (value.isConfirmed) {
          navigate(
            authData.userRole === "admin"
              ? PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PRODUCTS_SERVICES
              : PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.PRODUCTS_SERVICES
          );
        }
        resetForm();
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        customClass: {
          container: "container",
        },
        icon: "error",
        title: "Error en la creación del servicio",
        text: `${response.response.data}`,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleUserChange = (e) => {
    const { outerText, id } = e.target;
    if (outerText && outerText.length > 0) {
      const email = outerText.split(" --- ")[1];
      if (id && id.includes("technician")) {
        setTechnicianListValue(outerText);
        const technicianId = technicians.find(
          (technician) => technician.email === email
        ).id;
        setProductInfo({ ...productInfo, technicianId: technicianId });
      } else {
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
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          justifyContent: "space-around",
        }}
      >
        <TextField
          label="Modelo del producto"
          value={productInfo.product_model}
          variant="outlined"
          name="product_model"
          onChange={handleChange}
        />
        <TextField
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
        {authData.userRole === "admin" && (
          <Autocomplete
            id={"technician"}
            selectOnFocus
            onChange={handleUserChange}
            value={technicianListValue}
            options={techniciansName}
            renderInput={(params) => (
              <TextField
                name="technician"
                {...params}
                label="Tecnico a asignar"
              />
            )}
          />
        )}
        <Autocomplete
          id={"user"}
          selectOnFocus
          onChange={handleUserChange}
          value={userListValue}
          options={usersName}
          renderInput={(params) => (
            <TextField name="user" {...params} label="Usuario" />
          )}
        />
        <Textarea
          value={productInfo.user_diagnosis}
          name="user_diagnosis"
          variant="outlined"
          minRows={3}
          placeholder="Diagnóstico del usuario"
          onChange={handleChange}
        />
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
