import Swal from "sweetalert2";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUsers, getUserRoles } from "../../services/userServices";
import { useEffect, useState } from "react";

const gridColumns = [
  { field: "id", headerName: "Id", width: 90 },
  { field: "name", headerName: "Nombre", width: 90 },
  { field: "surname", headerName: "Apellido", width: 90 },
  { field: "email", headerName: "Email", width: 90 },
];

const UsersTable = () => {
  const [users, setuser] = useState([]);

  const getUsers = async (variant) => {
    let roles;
    let response;

    switch (variant) {
      case "all":
        response = await getAllUsers();
        roles = await getUserRoles();
        break;

      default:
        break;
    }

    if (response.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en la obtención de usuarios",
        text: `No se pudo cargar la tabla`,
      });
    }
    console.log("hola");
    console.log(response.data);
    setuser(response.data);
  };

  useEffect(() => {
    getUsers("all");
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "95%",
        minHeight: "10vh",
        textAlign: "center",
      }}
    >
      <Typography>Lista de usuarios</Typography>
      <DataGrid
        columns={gridColumns}
        rows={users}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      ></DataGrid>
    </Box>
  );
};

export default UsersTable;
