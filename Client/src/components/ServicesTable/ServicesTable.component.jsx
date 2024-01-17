//HOOKS
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
//MATERIAL UI
import { Box, Select, MenuItem } from "@mui/material";
import {
  GridCellEditStopReasons,
  GridLogicOperator,
  esES,
} from "@mui/x-data-grid";
//COMPONENT
import LoadingProgress from "../Loading/Loading.component";
import {
  StyledDataGrid,
  CustomToolbar,
} from "../CustomDataGrid/CustomDataGrid.component";
//SERVICES
import {
  getServices,
  updateService,
  logicalDeleteService,
} from "../../services/serviceServices";
import { getUsersByRole } from "../../services/userServices";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import { serviceStatuses } from "../../utils/serviceStatuses";
//SWEET ALERT
import Swal from "sweetalert2";

const ServicesTable = () => {
  const editingRow = useRef(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [availableModify, setAvailableModify] = useState(false);
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [rowSelected, setRowSelected] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const language = esES;
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  const statuses = [...serviceStatuses.progress, serviceStatuses.cancel];

  const columns = [
    {
      field: "id",
      headerName: "ID Servicio",
      minWidth: 300,
      headerAlign: "center",
    },
    {
      field: "clientName",
      headerName: "Usuario",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "clientEmail",
      headerName: "Email",
      minWidth: 200,
      headerAlign: "center",
    },
    {
      field: "product_model",
      headerName: "Modelo",
      minWidth: 200,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "product_income_date",
      headerName: "fecha de ingreso",
      minWidth: 300,
      headerAlign: "center",
    },
    {
      field: "technicianId",
      headerName: "ID Técnico ",
      minWidth: 300,
      headerAlign: "center",
    },
    {
      field: "technicianName",
      headerName: "Técnico",
      minWidth: 250,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            handleTechnicianChange(
              params.id,
              e.target.value,
              params.row.technicianId
            )
          }
          sx={{ width: "100%" }}
        >
          {technicians.map((technician) => {
            return (
              <MenuItem
                key={technician.id}
                value={technician?.name + " " + technician?.surname}
              >
                {technician?.name + " " + technician?.surname}
              </MenuItem>
            );
          })}
        </Select>
      ),
    },
    {
      field: "user_diagnosis",
      headerName: "Falla reportada",
      minWidth: 200,
      headerAlign: "center",
    },
    {
      field: "budget",
      headerName: "Presupuesto",
      minWidth: 180,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "confirm_repair",
      headerName: "Confirmado",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Estado",
      minWidth: 250,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleStatusChange(params.id, e.target.value)}
          sx={{ width: "100%" }}
        >
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "technical_diagnosis",
      headerName: "Diagnostico tecnico",
      minWidth: 250,
      headerAlign: "center",
    },
    {
      field: "final_diagnosis",
      headerName: "Diagnostico final",
      minWidth: 250,
      headerAlign: "center",
    },
    {
      field: "isDelete",
      headerName: "Borrado",
      minWidth: 150,
      headerAlign: "center",
      editable: true,
    },
  ];

  const getAllServices = async () => {
    try {
      const response = await getServices(false, authData.jwt);
      if (
        !response.data ||
        !Array.isArray(response.data) ||
        response.data.length === 0
      ) {
        Swal.fire({
          icon: "warning",
          title: "No se encontaron datos en la DB",
          text: "Por favor, verifica que tengas servicios cargados.",
        });
        return;
      }
      const newServices = response.data.map((service) => {
        let formatedDate = service.product_income_date.split("T")[0].split("-");
        formatedDate =
          formatedDate[2] + "/" + formatedDate[1] + "/" + formatedDate[0];
        return {
          id: service.id,
          clientName: service.clientName,
          clientEmail: service.clientEmail,
          product_model: service.product_model,
          product_income_date: formatedDate,
          isDelete: service.isDelete,
          technicianId: service.technicianId,
          technicianName: service.technicianName,
          user_diagnosis: service.Service_status?.user_diagnosis,
          budget: service.Service_status?.budget,
          confirm_repair: service.Service_status?.confirm_repair,
          status: service.Service_status?.status,
          technical_diagnosis: service.Service_status?.technical_diagnosis,
          final_diagnosis: service.Service_status?.final_diagnosis,
        };
      });
      setServices(newServices);
    } catch (error) {
      setError("Error al obtener servicios");
    } finally {
      setLoading(false);
    }
  };

  const handleTechnicianChange = async (
    id,
    newTechnicianName,
    technicianId
  ) => {
    console.log("TECH ID", technicianId);
    try {
      const newTechnician = technicians.find(
        (technician) =>
          technician.name + " " + technician.surname === newTechnicianName
      );
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });
      Swal.showLoading();
      const response = await updateService(
        id,
        { technicianId: newTechnician.id, technicianName: newTechnicianName },
        authData.jwt
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Actualización Exitosa",
          text: "El técnico ha sido actualizado correctamente",
        });
        getAllServices();
        return newTechnicianName;
      } else {
        Swal.fire({
          icon: "error",
          title: "Actualización Erronea",
          text: "Hubo un error al actualizar el técnico del servicio",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Desconocido",
        text: "Ha ocurrido un error al intentar actualizar el técnico",
      });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });
      Swal.showLoading();
      const response = await updateService(
        id,
        { status: newStatus },
        authData.jwt
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Actualización Exitosa",
          text: "El estado ha sido actualizado correctamente",
        });
        getAllServices();
        return newStatus;
      } else {
        Swal.fire({
          icon: "error",
          title: "Actualizacion Erronea",
          text: "Hubo un error al actualizar el estado del servicio",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Desconocido",
        text: "Ha ocurrido un error al intentar actualizar el estado",
      });
    }
  };

  const getTechnicians = async () => {
    const response = await getUsersByRole("technician", authData.jwt);
    if (response.error) {
      Swal.fire({
        icon: "error",
        title: "Error en la obtención de usuarios",
        text: `${response.data}`,
      });
    } else {
      setTechnicians(response.data);
    }
  };

  useEffect(() => {
    getAllServices();
    getTechnicians();
    setStatusOptions(statuses);
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

  const handleDelete = async (selectedRows) => {
    try {
      if (selectedRows.length > 0) {
        const response = await Promise.all(
          selectedRows.map((id) => {
            return logicalDeleteService(id, authData.jwt);
          })
        );
        let msg = response.map((res) => res.data);
        msg = msg.join(", ");
        Swal.fire({
          icon: "success",
          title: "Eliminación exitosa",
          text: msg,
        });
        getAllServices();
        return selectedRows;
      } else {
        Swal.fire({
          icon: "warning",
          title: "No hay servicios seleccionados",
          text: "Por favor, selecciona al menos un servicio para eliminar.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al realizar el borrado lógico",
        text: "Ha ocurrido un error al intentar eliminar los servicios.",
      });
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      if (availableModify) {
        Swal.fire({
          icon: "info",
          allowOutsideClick: false,
          title: "Por favor espere mientras procesamos la información",
          showConfirmButton: false,
        });
        Swal.showLoading();
        setAvailableModify(false);
        const serviceId = newRow.id;

        const response = await updateService(serviceId, newRow, authData.jwt);

        if (response.status === 200) {
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === editingRow.current?.id ? newRow : row
            )
          );
          setServices((prevServices) =>
            prevServices.map((service) =>
              service.id === newRow.id ? { ...service, ...newRow } : service
            )
          );
          Swal.fire({
            icon: "success",
            title: "Edición exitosa",
            text: "El servicio ha sido editado correctamente.",
          });
          return newRow;
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al actualizar",
            text: "Hubo un error al actualizar el servicio.",
          });
        }
      }
    } catch (error) {
      throw new Error("Error al comunicarse con el servidor", error);
    }
  };

  const handleErrorInput = () => {
    Swal.fire({
      icon: "error",
      title: "Error en la edición",
      allowOutsideClick: false,
      allowEnterKey: false,
      text: "Ha ocurrido un error al intentar editar el servicio.",
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
        mt: "1em",
      }}
    >
      <StyledDataGrid
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleErrorInput}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelected(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelected}
        ignoreDiacritics
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
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
            dataName: "Lista de Servicios",
            showQuickFilter: true,
            selectedRows: rowSelected,
          },
        }}
        getRowClassName={(params) => {
          return params.row.isDelete
            ? `row--deleted`
            : params.row.confirm_repair === true &&
              params.row.status === "Servicio finalizado"
            ? `row--finalized`
            : params.row.confirm_repair === true
            ? `row--accepted`
            : `row`;
        }}
        disableRowSelectionOnClick
        rows={services}
        columns={columns}
        pageSize={5}
        localeText={language.components.MuiDataGrid.defaultProps.localeText}
        editMode="cell"
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              product_income_date: false,
              technical_diagnosis: false,
              final_diagnosis: false,
              isDelete: false,
              confirm_repair: false,
              technicianId: false,
              clientEmail: false,
            },
          },
        }}
      />
      {loading && <LoadingProgress />}
    </Box>
  );
};

export default ServicesTable;
