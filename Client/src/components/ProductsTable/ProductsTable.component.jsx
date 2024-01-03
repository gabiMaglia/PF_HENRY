import axios from "axios";
import { useEffect, useState } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [rowSelected, setRowSelected] = useState([]);

  const language = esES;

  const urlBack = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
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

  const handleDelete = async () => {
    const response = await fetchDelete(rowSelected);
    if (Array.isArray(response)) {
      // Si response es un array, iterar sobre él
      response.forEach((value) => {
        // ...
      });
    } else {
      // Si response no es un array, tratarlo según sea necesario
      console.error("La respuesta de fetchDelete no es un array:", response);
    }
    if (response.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.error,
      });
      console.log(response.error);
    } else {
      getProducts();
      let responses = "";
      response.forEach((value) => {
        responses = responses + " ---- " + value.data.response;
      });
      Swal.fire({
        icon: "success",
        title: "Producto/s actualizados exitosamente",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#fd611a",
        text: responses,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    logicalDeleteProduct("f02375f9-54ec-4048-8034-a5b5a6f7dec3");
  }, []);

  const productsWithBrandAndCategory = products.map((product) => {
    const brand =
      product.ProductBrands.length > 0
        ? product.ProductBrands[0].name
        : "Sin marca";
    const category =
      product.ProductCategories.length > 0
        ? product.ProductCategories[0].name
        : "Sin categoría";

    return {
      ...product,
      brand,
      category,
    };
  });

  const columns = [
    // { field: "id", headerName: "ID", minWidth: 70 },
    { field: "name", headerName: "Nombre", width: 350, headerAlign: "center" },
    { field: "price", headerName: "Precio", width: 80, headerAlign: "center" },
    { field: "warranty", headerName: "Garantía", type: "number", width: 100, headerAlign: "center" },
    { field: "soldCount", headerName: "Vendidos", width: 80, headerAlign: "center" },
    { field: "brand", headerName: "Marca", width: 150, headerAlign: "center" },
    { field: "category", headerName: "Categoría", width: 150, headerAlign: "center" },
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
          },
        }}
        getRowClassName={(params) => {
          return params.row.isDeleted ? `row--deleted` : `row`;
        }}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={rowSelected}
        rows={productsWithBrandAndCategory}
        columns={columns}
        pageSize={5}
        localeText={language.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
};

export default ProductsTable;
