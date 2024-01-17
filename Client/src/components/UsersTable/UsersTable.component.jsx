//HOOKS
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
//MATERIAL UI
import { Box } from "@mui/material";
import {
  GridCellEditStopReasons,
  GridLogicOperator,
  esES,
} from "@mui/x-data-grid";
//COMPONENTS
import Loading from "../Loading/Loading.component";
import {
  StyledDataGrid,
  CustomToolbar,
} from "../CustomDataGrid/CustomDataGrid.component";
//SERVICES
import { getAllUsers, getUserRoles } from "../../services/userServices";
import { putUser, isDeleteChange } from "../../services/userServices";
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
    minWidth: 300,
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
    field: "communication_preference",
    headerAlign: "center",
    headerName: "Preferencia de comunicación",
    minWidth: 200,
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

  const handleDelete = async () => {
    const response = await isDeleteChange(rowSelected, authData.jwt);
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
          communication_preference: newRow.communication_preference,
          isActive: newRow.isActive,
          isVerified: newRow.isVerified,
          userAddress: {},
        };
        const response = await putUser(newRow.id, newRow.role, editedUser);
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
        //width: "100%",
        position: "relative",
        maxWidth: "75%",
        height: { xxs: "70%", xs: "70%", sm: "90%", md: "90%" },
        minHeight: "10vh",
        textAlign: "center",
        mt: "2em",
        mb: "2em",
      }}
    >
      <StyledDataGrid
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
            setFilterButtonEl,
            handleDelete,
            dataName: "Lista de usuarios",
            showQuickFilter: true,
          },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
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
      ></StyledDataGrid>
      {isLoading && <Loading />}
    </Box>
  );
};

export default UsersTable;
