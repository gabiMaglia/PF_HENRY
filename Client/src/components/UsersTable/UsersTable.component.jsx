import Swal from "sweetalert2";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { getAllUsers } from "../../services/userServices";
import { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setuser] = useState([]);

  const getUsers = async (variant) => {
    let response;
    switch (variant) {
      case "all":
        response = await getAllUsers();
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
    setuser(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getUsers("all");
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%", textAlign: "center" }}>
      <Typography>Lista de usuarios</Typography>
      <DataGrid></DataGrid>
    </Box>
  );
};

export default UsersTable;
