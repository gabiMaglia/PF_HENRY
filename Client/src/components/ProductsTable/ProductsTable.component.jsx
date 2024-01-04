import axios from "axios";
import { useEffect, useState, useRef } from "react";
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
//UTILS
import { logicalDeleteProduct } from "../../services/productServices";
// SweetAlert
import Swal from "sweetalert2";

const ProductsTable = () => {
  const editingRow = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [availableModify, setAvailableModify] = useState(false);
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [rowSelected, setRowSelected] = useState([]);

  const language = esES;

  const urlBack = import.meta.env.VITE_BACKEND_URL;

  const getProducts = async () => {
    try {
      const response = await axios.get(`${urlBack}/product/`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
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
            return logicalDeleteProduct(id);
          })
        );
        let msg = response.map((res) => res.data);
        msg = msg.join(", ");
        Swal.fire({
          icon: "success",
          title: "Eliminación exitosa",
          text: msg,
        });
        getProducts();
        return selectedRows;
      } else {
        Swal.fire({
          icon: "warning",
          title: "No hay productos seleccionados",
          text: "Por favor, selecciona al menos un producto para eliminar.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al realizar el borrado lógico",
        text: "Ha ocurrido un error al intentar eliminar los productos.",
      });
    }
  };

  const productsWithBrandAndCategory = products.map((product) => {
    const brand =
      product.ProductBrands.length > 0
        ? product.ProductBrands[0].name
        : "Sin marca";
    const category =
      product.ProductCategories.length > 0
        ? product.ProductCategories[0].name
        : "Sin categoría";
    const stock = product.ProductStock?.amount || 0;
    return {
      ...product,
      brand,
      category,
      stock,
    };
  });

  // const processRowUpdate = async (newRow) => {
  //   const nameAvailableRoles = userRoles.map((role) => role.role_name);
  //   if (availableModify) {
  //     if (nameAvailableRoles.includes(newRow.role)) {
  //       Swal.fire({
  //         icon: "info",
  //         allowOutsideClick: false,
  //         title: "Por favor espere mientras procesamos la información",
  //         showConfirmButton: false,
  //       });
  //       Swal.showLoading();
  //       setAvailableModify(false);
  //       const editedUser = {
  //         name: newRow.name,
  //         price: newRow.price,
  //         warranty: newRow.warranty,
  //         is_deleted: newRow.is_deleted,
  //         soldCount: newRow.souldCount,
  //       };
  //       const response = await updateProduct(newRow.id, newRow.role, editedUser);
  //       if (response.status === 200) {
  //         setRows((prevRows) =>
  //           prevRows.map((row) =>
  //             row.id === editingRow.current?.id ? newRow : row
  //           )
  //         );
  //         Swal.fire({
  //           allowOutsideClick: false,
  //           icon: "success",
  //           title: "Los datos ingresados son validos",
  //           text: "Información modificada correctamente",
  //           confirmButtonText: "Aceptar",
  //           confirmButtonColor: "#fd611a",
  //         });
  //         return newRow;
  //       } else {
  //         throw new Error(response.response.data);
  //       }
  //     } else {
  //       console.log("error");
  //       throw new Error("El rol ingresado no es válido");
  //     }
  //   }
  //   return newRow;
  // };

  // const handleErrorInput = (error) => {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error en la edición de usuario",
  //     allowOutsideClick: false,
  //     allowEnterKey: false,
  //     text: `${error}`,
  //   });
  // };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 300, headerAlign: "center" },
    { field: "name", headerName: "Nombre", width: 350, headerAlign: "center" },
    { field: "price", headerName: "Precio", width: 80, headerAlign: "center" },
    {
      field: "warranty",
      headerName: "Garantía",
      type: "number",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "is_deleted",
      headerName: "Borrado",
      type: Boolean,
      width: 100,
      headerAlign: "center",
    },
    {
      field: "soldCount",
      headerName: "Vendidos",
      width: 80,
      headerAlign: "center",
    },
    { field: "brand", headerName: "Marca", width: 150, headerAlign: "center" },
    {
      field: "category",
      headerName: "Categoría",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 150,
      headerAlign: "center",
    },
  ];

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
        // processRowUpdate={processRowUpdate}
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
          filterPanel: {
            logicOperators: [GridLogicOperator.And],
          },
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
            handleDelete,
            dataName: "Lista de productos",
            showQuickFilter: true,
            selectedRows: rowSelected,
          },
        }}
        getRowClassName={(params) => {
          return params.row.is_deleted ? `row--deleted` : `row`;
        }}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={rowSelected}
        rows={productsWithBrandAndCategory}
        columns={columns}
        pageSize={5}
        localeText={language.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              warranty: false,
              is_deleted: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default ProductsTable;
