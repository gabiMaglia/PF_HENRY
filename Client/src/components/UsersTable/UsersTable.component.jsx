//HOOKS
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
//MATERIAL UI
import { Typography, Box, Button } from "@mui/material";
import {
  DataGrid,
  GridCellEditStopReasons,
  GridLogicOperator,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  esES,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
//COMPONENTS
import Loading from "../Loading/Loading.component";
//SERVICES
import { getAllUsers, getUserRoles } from "../../services/userServices";
import { PutUser, isDeleteChange } from "../../services/userServices";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
//SWEET ALERT
import Swal from "sweetalert2";

const gridColumns = [
  {
    field: "id",
    headerName: "Id",
    headerAlign: "center",
    minWidth: 300,
  },
  {
    field: "name",
    headerName: "Nombre",
    minWidth: 150,
    headerAlign: "center",
    editable: "true",
  },
  {
    field: "surname",
    headerName: "Apellido",
    minWidth: 150,
    headerAlign: "center",
    editable: "true",
  },
  {
    field: "telephone",
    headerName: "Telefono",
    minWidth: 50,
    headerAlign: "center",
    editable: "true",
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 200,
    headerAlign: "center",
    editable: "true",
  },
  {
    field: "role",
    headerName: "Rol",
    minWidth: 50,
    headerAlign: "center",
    editable: "true",
  },
  {
    field: "isActive",
    headerAlign: "center",
    headerName: "Activo",
    minWidth: 25,
    editable: "true",
  },
  {
    field: "isVerified",
    headerAlign: "center",
    headerName: "Verificado",
    minWidth: 25,
    editable: "true",
  },
  {
    field: "isDeleted",
    headerAlign: "center",
    headerName: "Eliminado",
    minWidth: 25,
    editable: false,
  },
];

const columnGroupingModel = [
  {
    groupId: "userData",
    headerName: "Datos del usuario",
    headerAlign: "center",
    description: "Datos personales del usuario",
    children: [
      { field: "id" },
      { field: "name" },
      { field: "surname" },
      { field: "email" },
      { field: "telephone" },
    ],
  },
  {
    groupId: "privateUserData",
    headerName: "Estado del usuario",
    headerAlign: "center",
    description: "Estado del usuario dentro de la pagina",
    children: [
      { field: "role" },
      { field: "isActive" },
      { field: "isVerified" },
      { field: "isDeleted" },
    ],
  },
];

const CustomToolbar = ({ setFilterButtonEl, rowSelected, getUsers }) => {
  const handleDelete = async () => {
    const response = await isDeleteChange(rowSelected);
    if (response.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.error,
      });
    } else {
      getUsers();
      let responses = "";
      response.forEach((value) => {
        responses = responses + " ---- " + value.data.response;
      });
      Swal.fire({
        icon: "success",
        title: "Usuario/s actualizados exitosamente",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#fd611a",
        text: responses,
      });
    }
  };

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#fd611a",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Button color="inherit" onClick={handleDelete}>
          <DeleteIcon sx={{ color: "black" }} />
        </Button>
        <Typography variant="h5" sx={{ flexGrow: "1" }}>
          Lista de usuarios
        </Typography>
        <GridToolbarQuickFilter sx={{ color: "black" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <GridToolbarColumnsButton sx={{ color: "black" }} />
        <GridToolbarFilterButton
          ref={setFilterButtonEl}
          sx={{ color: "black" }}
        />
        <GridToolbarDensitySelector sx={{ color: "black" }} />
        <GridToolbarExport sx={{ color: "black" }} />
      </Box>
    </GridToolbarContainer>
  );
};

const UsersTable = () => {
  const language = esES;
  const editingRow = useRef(null);
  const [rows, setRows] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [availableModify, setAvailableModify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [rowSelected, setRowSelected] = useState([]);

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

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
    setUserRoles(roles);
    setRows(newUsers);
    setIsLoading(false);
  };

  const getUsers = async () => {
    const response = await getAllUsers(authData.jwt);
    const roles = await getUserRoles(authData.jwt);
    if (response.error || roles.error) {
      const error = response.error
        ? response.error.response.data.error
        : roles.error.response.data.error;
      setIsLoading(false);
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en la obtención de usuarios",
        text: `${error}`,
      });
    }

    addRole(response.data, roles.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleCellEditStart = (params) => {
    editingRow.current = rows.find((row) => row.id === params.id) || null;
  };

  const handleCellEditStop = (params) => {
    if (
      params.reason === GridCellEditStopReasons.escapeKeyDown ||
      params.reason === GridCellEditStopReasons.cellFocusOut
    ) {
      setAvailableModify(false);
    } else {
      setAvailableModify(true);
    }
  };

  const processRowUpdate = async (newRow) => {
    const nameAvailableRoles = userRoles.map((role) => role.role_name);
    if (availableModify) {
      if (nameAvailableRoles.includes(newRow.role)) {
        Swal.fire({
          icon: "info",
          allowOutsideClick: false,
          title: "Por favor espere mientras procesamos la información",
          showConfirmButton: false,
        });
        Swal.showLoading();
        setAvailableModify(false);
        const editedUser = {
          name: newRow.name,
          surname: newRow.surname,
          birthdate: newRow.birthdate,
          dni: newRow.dni,
          email: newRow.email,
          telephone: newRow.telephone,
          image: newRow.image,
          isActive: newRow.isActive,
          isVerified: newRow.isVerified,
          userAddress: {},
        };
        const response = await PutUser(newRow.id, newRow.role, editedUser);
        if (response.status === 200) {
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === editingRow.current?.id ? newRow : row
            )
          );
          Swal.fire({
            allowOutsideClick: false,
            icon: "success",
            title: "Los datos ingresados son validos",
            text: "Información modificada correctamente",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#fd611a",
          });
          return newRow;
        } else {
          throw new Error(response.response.data);
        }
      } else {
        console.log("error");
        throw new Error("El rol ingresado no es válido");
      }
    }
    return newRow;
  };

  const handleErrorInput = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error en la edición de usuario",
      allowOutsideClick: false,
      allowEnterKey: false,
      text: `${error}`,
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        maxWidth: "70%",
        height: "95%",
        minHeight: "10vh",
        textAlign: "center",
      }}
    >
      <DataGrid
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        ignoreDiacritics
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
        columnGroupingModel={columnGroupingModel}
        slots={{
          toolbar: CustomToolbar,
        }}
        localeText={language.components.MuiDataGrid.defaultProps.localeText}
        slotProps={{
          filterPanel: {
            logicOperators: [GridLogicOperator.And],
          },
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            rowSelected,
            showQuickFilter: true,
            setFilterButtonEl,
            getUsers,
          },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              telephone: false,
              isActive: false,
              isVerified: false,
              isDeleted: false,
            },
          },
          filter: {
            filterModel: {
              items: [
                { field: "isDeleted", operator: "equals", value: "false" },
              ],
            },
          },
        }}
        sx={{
          mt: "1em",
          scrollbarWidth: "none",
          textAlign: "center",
          "& .MuiDataGrid-cell": {
            justifyContent: "center",
            "&:active": {
              border: "5px solid #fd611a",
            },
            "&:focus-within": {
              outline: "2px solid #fd611a",
            },
          },
          "& .MuiDataGrid-row": {
            "&:focus-within": {
              backgroundColor: "#fb773a",
            },
            "&.Mui-selected": {
              "& .MuiDataGrid-cell:focus-within": {
                outline: "0px",
              },
              backgroundColor: "#fd611a",
              "&:hover": {
                backgroundColor: "#fb773a",
              },
            },
          },
          "& .row--deleted": {
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "#ff2b2b",
            },
            "&:active": {
              backgroundColor: "#ff2b2b",
            },
            "&:focus-within": {
              backgroundColor: "#ff2b2b",
            },
            "&.Mui-selected": {
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "#ff2b2b",
              },
            },
          },
          "& .MuiCheckbox-root svg": {
            width: ".5em",
            height: ".5em",
            border: "1px solid black",
            borderRadius: "2px",
          },
          "& .MuiCheckbox-root svg path": {
            display: "none",
          },
          "& .MuiCheckbox-root": {
            borderRadius: "0px",
            width: "100%",
            height: "100%",
          },
          "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg":
            {
              backgroundColor: "black",
              borderColor: "black",
            },
        }}
        getRowClassName={(params) => {
          return params.row.isDeleted ? `row--deleted` : `row`;
        }}
        columns={gridColumns}
        rows={rows}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleErrorInput}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelected(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelected}
      ></DataGrid>
      {isLoading && <Loading />}
    </Box>
  );
};

export default UsersTable;
