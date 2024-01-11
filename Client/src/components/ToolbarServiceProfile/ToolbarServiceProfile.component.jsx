import { Autocomplete, Box, TextField } from "@mui/material";
import {
  getUsersByRole,
  getUserById,
  putUser,
} from "../../services/userServices";
import { filterService } from "../../services/serviceServices";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { serviceStatuses } from "../../utils/serviceStatuses.js";

const statuses = [...serviceStatuses.progress, serviceStatuses.cancel];

const ToolbarServiceProfile = (
  authData,
  getAllServices = () => {},
  setCardPerDates = () => {},
  setIsLoading = () => {},
  sortCards = () => {}
) => {
  console.log(
    authData,
    getAllServices,
    setCardPerDates,
    setIsLoading,
    sortCards
  );
  const [filters, setFilters] = useState({
    users: null,
    status: null,
  });
  const [usersId, setUsersId] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

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
        response = await filterService(newValue, authData.userId, authData.jwt);
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
    getUsers;
  }, []);

  useEffect(() => {
    if (
      user?.communication_preference === "Pendiente" &&
      authData.userRole === "customer"
    ) {
      Swal.fire({
        icon: "info",
        title: "Gracias por confiar en HyperMegaRed",
        text: `Elije el medio de comunicación que prefieres para recibir información sobre el estado del servicio`,
        confirmButtonText: "Email",
        showDenyButton: true,
        denyButtonText: "Whatsapp",
        denyButtonColor: "#25d366",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await putUser(user.id, authData.userRole, {
            communication_preference: "Email",
          });
        } else if (result.isDenied) {
          const response = await putUser(user.id, authData.userRole, {
            communication_preference: "Whatsapp",
          });
        }
      });
    }
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
        pb: ".5em",
        zIndex: "10",
        gap: "15%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {authData.userRole === "technician" && (
        <Autocomplete
          id={"users"}
          sx={{ width: "40%" }}
          selectOnFocus
          onChange={(e, newValue, clear) => {
            handleFilterChange(newValue, clear, "users");
          }}
          value={filters.users}
          options={users}
          renderInput={(params) => (
            <TextField name="users" {...params} label="Filtrar por usuario" />
          )}
        />
      )}
      <Autocomplete
        id={"status"}
        sx={{ width: "40%" }}
        selectOnFocus
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
  );
};

export default ToolbarServiceProfile;
