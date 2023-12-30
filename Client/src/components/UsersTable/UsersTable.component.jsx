import Swal from "sweetalert2";
import { Typography, Box } from "@mui/material";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import { getAllUsers, getUserRoles } from "../../services/userServices";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";

const gridColumns = [
  { field: "id", headerName: "Id", width: 90 },
  { field: "name", headerName: "Nombre", width: 90, editable: "true" },
  { field: "surname", headerName: "Apellido", width: 90, editable: "true" },
  { field: "email", headerName: "Email", width: 90, editable: "true" },
  { field: "role", headerName: "Rol", width: 90, editable: "true" },
];

const UsersTable = () => {
  const editingRow = useRef(null);
  const [rows, setRows] = useState([]);
  const [roles, setRoles] = useState([]);

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  // const handleDataChange = (e) => {
  //   // console.log(ref.current.updateRows);
  //   console.log(e);
  //   const { name, surname, birthdate, dni, email, telephone, image, role } =
  //     e.row;
  //   console.log(name, surname, birthdate, dni, email, telephone, image, role);
  //   // editedUser = {
  //   // id : e.id,
  //   //   name,
  //   //   surname
  //   //   birthdate,
  //   //   dni ,
  //   //   email,
  //   //   telephone,
  //   //   image,
  //   //   role,
  //   //   userAddress: {},
  //   // };
  // };

  const addRole = (rows, roles) => {
    const newUsers = rows.map((user) => {
      switch (user.rolId) {
        case roles[0].id:
          user.role = roles[0].role_name;
          break;
        case roles[1].id:
          user.role = roles[1].role_name;
          break;
        case roles[2].id:
          user.role = roles[2].role_name;
          break;

        default:
          user.role = "No encontrado";
          break;
      }
      return user;
    });
    setRoles(roles);
    setRows(newUsers);
  };

  const getUsers = async () => {
    const response = await getAllUsers(authData.jwt);
    const roles = await getUserRoles(authData.jwt);

    if (response.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en la obtención de usuarios",
        text: `No se pudo cargar la tabla`,
      });
    }

    addRole(response.data, roles.data);
  };

  useEffect(() => {
    getUsers("all");
  }, []);

  const handleCellEditStart = (params) => {
    editingRow.current = rows.find((row) => row.id === params.id) || null;
  };

  const handleCellEditStop = (params) => {
    if (params.reason === GridCellEditStopReasons.escapeKeyDown) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === editingRow.current?.id
            ? { ...row, account: editingRow.current?.account }
            : row
        )
      );
    }
  };

  const processRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === editingRow.current?.id ? newRow : row))
    );
    return newRow;
  };

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
        rows={rows}
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        processRowUpdate={processRowUpdate}
      ></DataGrid>
    </Box>
  );
};

export default UsersTable;
