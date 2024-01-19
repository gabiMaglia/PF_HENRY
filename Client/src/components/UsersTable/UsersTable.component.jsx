//HOOKS
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
//MATERIAL UI
import { Box, Select, MenuItem, Typography } from "@mui/material";
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
import { putUser, logicalDeleteUser, isDeleteChange } from "../../services/userServices";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
//SWEET ALERT
import Swal from "sweetalert2";

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

  const roleTranslations = {
    admin: "Admin",
    customer: "Cliente",
    technician: "Técnico",
  };

  const gridColumns = [
    {
      field: "id",
      headerName: "Id",
      headerAlign: "center",
      minWidth: 300,
    },
    {
      field: "fullName",
      headerName: "Usuario",
      minWidth: 250,
      headerAlign: "center",
      valueGetter: (params) => `${params.row.name} ${params.row.surname}`,
    },
    {
      field: "telephone",
      headerName: "Teléfono",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Rol",
      minWidth: 180,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleRoleChange(params.id, e.target.value)}
          sx={{ width: "100%" }}
        >
          {[...userRoles]
            .sort((a, b) => a.role_name.localeCompare(b.role_name))
            .map((role) => (
              <MenuItem key={role.id} value={role.role_name}>
                {roleTranslations[role.role_name]}
              </MenuItem>
            ))}
        </Select>
      ),
    },
    {
      field: "communication_preference",
      headerAlign: "center",
      headerName: "Comunicación",
      minWidth: 200,
    },
    {
      field: "isVerified",
      headerAlign: "center",
      headerName: "Verificado",
      minWidth: 25,
      renderCell: (params) => <Box>{params.value ? "Si" : "No"}</Box>,
    },
    {
      field: "isActive",
      headerAlign: "center",
      headerName: "Activo",
      minWidth: 120,
      renderCell: (params) => <Box>{params.value ? "Si" : "No"}</Box>,
    },
    {
      field: "isDeleted",
      headerAlign: "center",
      headerName: "Eliminado",
      minWidth: 25,
      renderCell: (params) => <Box>{params.value ? "Si" : "No"}</Box>,
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

  const handleRoleChange = async (id, newRole) => {
    try {
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });
      Swal.showLoading();
      const response = await putUser(id, newRole);
      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, role: newRole } : row
          )
        );
        Swal.fire({
          icon: "success",
          title: "Actualización Exitosa",
          text: "El rol ha sido actualizado correctamente",
        });
        return newRole;
      } else {
        Swal.fire({
          icon: "error",
          title: "Actualizacion Erronea",
          text: "Hubo un error al actualizar el rol del usuario",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Desconocido",
        text: "Ha ocurrido un error al intentar actualizar el rol",
      });
    }
  };

  const handleDelete = async (selectedRows)=>{
    try {
      if(selectedRows.length > 0) {
        const response = await Promise.all(
          selectedRows.map((id) => {
            return logicalDeleteUser(id, authData.jwt);
          })
        );
        let msg = response.map((res) => res.data);
        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: msg,
        });
        getUsers();
        setRowSelected([]);
        return selectedRows;
      } else {
        Swal.fire({
          icon: "warning",
          title: "No hay usuarios seleccionados",
          text: "Por favor, selecciona al menos un usuario para eliminar.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al realizar el borrado lógico",
        text: "Ha ocurrido un error al intentar borrar el usuario.",
      });
    }
  }

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
    <>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          maxWidth: "70%",
          height: "100%",
          minHeight: "10vh",
          textAlign: "center",
          mt: "1em",
        }}
      >
        <Box sx={{ height: "80%" }}>
          <StyledDataGrid
            onCellEditStart={handleCellEditStart}
            onCellEditStop={handleCellEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleErrorInput}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelected(newRowSelectionModel);
            }}
            ignoreDiacritics
            pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
            columnGroupingModel={columnGroupingModel}
            slots={{
              toolbar: CustomToolbar,
            }}
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
                selectedRows: rowSelected,
              },
            }}
            getRowClassName={(params) => {
              return params.row.isDeleted
                ? `row--deleted`
                : params.row.isVerified === false
                ? `row--carousel`
                : `row`;
            }}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={rowSelected}
            rows={rows}
            columns={gridColumns}
            pageSize={5}
            localeText={language.components.MuiDataGrid.defaultProps.localeText}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                  isVerified: false,
                  isDeleted: false,
                },
              },
            }}
          ></StyledDataGrid>
          {isLoading && <Loading />}
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "25px", fontWeight: "bold" }}
          >
            Esato del usuario segun color
          </Typography>
          <Box sx={{ display: "flex", gap: "50px", justifyContent: "center" }}>
            <Typography sx={{ fontWeight: "600" }}>🟦 Sin verificar</Typography>
            <Typography sx={{ fontWeight: "600" }}>🟥 Eliminado</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UsersTable;
