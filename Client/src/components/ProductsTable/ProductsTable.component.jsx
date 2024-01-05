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
import {
  logicalDeleteProduct,
  fetchUpdateProduct,
} from "../../services/productServices";
// SweetAlert
import Swal from "sweetalert2";

const columns = [
  { field: "id", headerName: "ID", minWidth: 300, headerAlign: "center" },
  {
    field: "name",
    headerName: "Nombre",
    width: 350,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "price",
    headerName: "Precio",
    width: 80,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "warranty",
    headerName: "Garantía",
    type: "number",
    width: 100,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "is_deleted",
    headerName: "Borrado",
    type: Boolean,
    width: 100,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "soldCount",
    headerName: "Vendidos",
    width: 80,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 150,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "category",
    headerName: "Categoría",
    width: 150,
    headerAlign: "center",
    editable: true,
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 150,
    headerAlign: "center",
    editable: true,
  },
];

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
    const stock =
      product.ProductStock?.amount !== undefined &&
      product.ProductStock.amount !== 0
        ? product.ProductStock.amount
        : "Sin stock";
    return {
      ...product,
      brand,
      category,
      stock,
    };
  });

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
        const productId = newRow.id;
        const editProduct = {};

        newRow?.name && (editProduct.name = newRow.name);
        newRow?.price && (editProduct.price = newRow.price);
        newRow?.warranty && (editProduct.warranty = newRow.warranty);
        newRow?.soldCount && (editProduct.soldCount = newRow.soldCount);
        newRow?.ProductStock &&
          (editProduct.ProductStock = newRow.ProductStock.amount);
        newRow?.ProductCategory &&
          (editProduct.ProductCategory = newRow.ProductCategory);
        newRow?.ProductBrand &&
          (editProduct.ProductBrand = newRow.ProductBrand);

        const response = await fetchUpdateProduct(productId, editProduct);
        if (response.status === 200) {
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === editingRow.current?.id ? newRow : row
            )
          );
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === newRow.id ? { ...product, ...newRow } : product
            )
          );
          Swal.fire({
            icon: "success",
            title: "Edición exitosa",
            text: "El producto ha sido editado correctamente.",
          });
          return newRow;
        } else {
          throw new Error("Error al actualizar el producto", response.message);
        }
      }
    } catch (error) {
      throw new Error("Error al comunicarse con el servidor", error);
    }
  };

  const handleErrorInput = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error en la edición de producto",
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
        editMode="cell"
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
