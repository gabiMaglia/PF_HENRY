//HOOKS
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
//MATERIAL UI
import { Box } from "@mui/material";
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
import { getServices, updateService } from "../../services/serviceServices";
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
//SWEET ALERT
import Swal from "sweetalert2";

const columns = [
  {
    field: "id",
    headerName: "ID",
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
    field: "isDelete",
    headerName: "Borrado",
    minWidth: 300,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "technicianName",
    headerName: "Tecnico asignado",
    minWidth: 200,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "user_diagnosis",
    headerName: "Falla reportada",
    minWidth: 300,
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
    headerName: "Reparacion confirmada",
    minWidth: 250,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Estado",
    minWidth: 200,
    headerAlign: "center",
    editable: true,
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
];

const ServicesTable = () => {
  const editingRow = useRef(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [serviceWithStatus, setServiceWithStatus] = useState([]);
  const [availableModify, setAvailableModify] = useState(false);
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [rowSelected, setRowSelected] = useState([]);
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const language = esES;

  const urlBack = import.meta.env.VITE_BACKEND_URL;

  // console.log(authData.jwt);

  const getAllServices = async () => {
    try {
      const response = await getServices(false, authData.jwt);
      const newServices = response.data.map((service) => {
        return {
          id: service.id,
          clientName: service.clientName,
          clientEmail: service.clientEmail,
          product_model: service.product_model,
          product_income_date: service.product_income_date,
          isDelete: service.isDelete,
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
      console.error("Error fetching products:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllServices();
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
            // return logicalDeleteService(id);
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
          text: "Por favor, selecciona al menos un Servicio para eliminar.",
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
        setAvailableModify(false);
        const serviceId = newRow.id;
        Swal.showLoading();

        const response = await updateService(serviceId, newRow, authData.jwt);
        if (response.status === 200) {
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === editingRow.current?.id ? newRow : row
            )
          );
          setServices((prevServices) =>
            prevServices.map((service) =>
              serviceId === newRow.id ? { ...service, ...newRow } : service
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
            title: "Error al actualizar el servicio",
            text: response.message || "Error desconocido",
          });
        }
      }
    } catch (error) {
      throw new Error("Error al comunicarse con el servidor", error);
    }
  };

  // const handleErrorInput = (error) => {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error en la edición del servicio",
  //     allowOutsideClick: false,
  //     allowEnterKey: false,
  //     text: `${error}`,
  //   });
  // };

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     const servicesData = await services.map(async (service) => {
  //       const serviceStatus = service.Service_status || {};
  //       console.log(serviceStatus, "ESTADO DEL SERVICIO");
  //       const {
  //         user_diagnosis,
  //         technical_diagnosis,
  //         final_diagnosis,
  //         budget,
  //         confirm_repair,
  //         status,
  //       } = serviceStatus;

  //       return {
  //         ...service,
  //         user_diagnosis,
  //         technical_diagnosis,
  //         final_diagnosis,
  //         budget,
  //         confirm_repair,
  //         status,
  //       };
  //     });
  //     const resolvedServicesData = await Promise.all(servicesData);
  //     setServiceWithStatus(resolvedServicesData);
  //   };

  //   fetchServices();
  // }, [services]);

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
        // onProcessRowUpdateError={handleErrorInput}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelected(newRowSelectionModel);
        }}
        ignoreDiacritics
        pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            setFilterButtonEl,
            handleDelete,
            dataName: "Lista de Servicios",
            showQuickFilter: true,
            selectedRows: rowSelected,
          },
        }}
        checkboxSelection
        rowSelectionModel={rowSelected}
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
              status: false,
              technical_diagnosis: false,
              final_diagnosis: false,
            },
          },
        }}
      />
      {loading && <LoadingProgress />}
    </Box>
  );
};

export default ServicesTable;
