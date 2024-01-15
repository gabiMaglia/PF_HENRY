//MATERIAL UI
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
// SERVICES
import {
  getUsersByRole,
  getUserById,
  putUser,
} from "../../services/userServices";
import { serviceStatuses } from "../../utils/serviceStatuses.js";
import { filterService } from "../../services/serviceServices";
//HOOKS
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// SWEET ALERT
import Swal from "sweetalert2";
//REDUX
import { updateInfo } from "../../redux/slices/userSlice";

const statuses = [...serviceStatuses.progress, serviceStatuses.cancel];

const ToolbarServiceProfile = ({
  authData = () => {},
  getAllServices = () => {},
  setCardPerDates = () => {},
  setIsLoading = () => {},
  sortCards = () => {},
}) => {
  const [filters, setFilters] = useState({
    users: null,
    status: null,
  });
  const [usersId, setUsersId] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleComunicationPreferenceChange = async (change) => {
    if (
      (user?.communication_preference === "Pendiente" || change) &&
      authData.userRole === "customer"
    ) {
      let choise = false;
      await Swal.fire({
        icon: "info",
        title: "Gracias por confiar en HyperMegaRed",
        text: `Elije el medio de comunicación que prefieres para recibir información sobre el estado del servicio`,
        confirmButtonText: "Email",
        showDenyButton: true,
        denyButtonText: "Whatsapp",
        denyButtonColor: "#25d366",
        showCancelButton: change,
        cancelButtonText: "Cancelar",
        footer:
          "Podras cambiarlo cuando quieras en la configuración de los servicios",
      }).then(async (result) => {
        if (result.isConfirmed) {
          choise = "Email";
        } else if (result.isDenied) {
          choise = "Whatsapp";
        }
      });
      if (choise) {
        Swal.fire({
          icon: "info",
          allowOutsideClick: false,
          title: "Por favor espere mientras procesamos la información",
          showConfirmButton: false,
        });
        Swal.showLoading();
        const response = await putUser(user.id, authData.userRole, {
          communication_preference: choise,
        });
        if (response.status === 200) {
          Swal.fire({
            allowOutsideClick: false,
            icon: "success",
            title: "Preferencia de comunicación actualizada",
            text: `Desde ahora se le informaran los cambios en el estado la reparación mediante ${choise}`,
          });
          dispatch(
            updateInfo({ userObject: { communication_preference: choise } })
          );
        } else {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error al cambiar la preferencia de comunicación",
            text: `Por favor intente de nuevo mas tarde`,
          });
        }
      }
    }
  };

  const getUsers = async () => {
    const users = await getUsersByRole("customer", authData.jwt);
    if (users.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error al obtener los usuarios",
        text: `${users}`,
      });
    } else {
      const usersName = users.data.map((user) => {
        return user.name + " " + user.surname + " ------- " + user.email;
      });
      setUsers(usersName);
      const usersId = users.data.map((user) => {
        return user.id;
      });
      setUsersId(usersId);
    }
    if (authData.userRole === "customer") {
      const user = await getUserById(authData.userId, authData.jwt);
      setUser(user);
    }
  };

  const handleFilterChange = async (newValue, clear, property) => {
    setCardPerDates([]);
    setIsLoading(true);
    if (!clear === "clear") {
      setFilters({ ...filters, [property]: null });
    } else {
      setFilters({ ...filters, [property]: newValue });
    }

    let userPosition;
    let response;
    if (property === "users") {
      users.forEach((user, index) => {
        user === newValue && (userPosition = index);
      });
      response = await filterService(
        filters.status,
        usersId[userPosition],
        authData.userId,
        authData.jwt
      );
    } else {
      if (authData.userRole === "customer") {
        response = await filterService(
          newValue,
          authData.userId,
          null,
          authData.jwt
        );
      } else {
        users.forEach((user, index) => {
          user === filters.users && (userPosition = index);
        });
        response = await filterService(
          newValue,
          usersId[userPosition],
          authData.userId,
          authData.jwt
        );
        response = await filterService(
          newValue,
          usersId[userPosition],
          authData.userId,
          authData.jwt
        );
      }
    }
    if (response.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en la carga de productos",
        text: `${response?.error?.response?.statusText}`,
      });
      setIsLoading(false);
    } else {
      if (response.data.length === 0) {
        Swal.fire({
          allowOutsideClick: false,
          icon: "info",
          showDenyButton: true,
          confirmButtonText: "Sí",
          confirmButtonColor: "#fd611a",
          title: "Parace que no hay servicios que coincidan con tu busqueda",
          text: `¿Desea restablecer los filtros?`,
        }).then((result) => {
          if (result.isConfirmed) {
            getAllServices();
            setFilters({
              users: null,
              status: null,
            });
          } else {
            setIsLoading(false);
          }
        });
      } else {
        sortCards(response.data);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    handleComunicationPreferenceChange();
  }, [user]);

  return (
    <Box
      sx={{
        width: "100%",
        border: "1px solid black",
        borderRadius: "10px",
        mt: ".5em",
        backgroundColor: "white",
        pt: ".5em",
        pl: "1em",
        pb: ".5em",
        zIndex: "10",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          flexGrow: "1",
          gap: "5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {authData.userRole === "technician" && (
          <Autocomplete
            id={"users"}
            selectOnFocus
            sx={{ flexGrow: "1" }}
            onChange={(e, newValue, clear) => {
              handleFilterChange(newValue, clear, "users");
            }}
            value={filters.users ? filters.users : null}
            options={users}
            renderInput={(params) => (
              <TextField name="users" {...params} label="Filtrar por usuario" />
            )}
          />
        )}
        <Autocomplete
          id={"status"}
          selectOnFocus
          sx={{ flexGrow: "1", mr: ".5em" }}
          onChange={(e, newValue, clear) => {
            handleFilterChange(newValue, clear, "status");
          }}
          value={filters.status ? filters.status : null}
          options={statuses}
          renderInput={(params) => (
            <TextField name="status" {...params} label="Filtrar por estados" />
          )}
        />
      </Box>
      {authData.userRole === "customer" && (
        <Button
          sx={{ mr: ".5em" }}
          onClick={() => {
            handleComunicationPreferenceChange(true);
          }}
        >
          <SettingsIcon fontSize="large" sx={{ color: "black" }} />
        </Button>
      )}
    </Box>
  );
};

export default ToolbarServiceProfile;
