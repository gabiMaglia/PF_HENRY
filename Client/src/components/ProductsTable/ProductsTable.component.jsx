//HOOKS
import axios from "axios";
import { useEffect, useState, useRef } from "react";
//MATERIAL UI
import { Box, Select, MenuItem, Typography } from "@mui/material";
import {
  GridCellEditStopReasons,
  GridLogicOperator,
  esES,
} from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
//COMPONENTS
import LoadingProgress from "../Loading/Loading.component";
import {
  StyledDataGrid,
  CustomToolbar,
} from "../CustomDataGrid/CustomDataGrid.component";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
//SERVICES
import {
  logicalDeleteProduct,
  addToCarouselProduct,
  fetchUpdateProduct,
} from "../../services/productServices";
import { fetchCategories } from "../../services/categoriesServices";
import { fetchBrands } from "../../services/brandsServices";
// SWEET ALERT
import Swal from "sweetalert2";

const ProductsTable = () => {
  const editingRow = useRef(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const brands = useSelector((state) => state.brands.brands);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [availableModify, setAvailableModify] = useState(false);
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const [rowSelected, setRowSelected] = useState([]);
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const language = esES;
  const urlBack = import.meta.env.VITE_BACKEND_URL;

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
      width: 150,
      headerAlign: "center",
      editable: true,
      valueFormatter: (params) => {
        const numericPrice = parseFloat(params.value);
        if (isNaN(numericPrice)) {
          return "Formato precio invalido";
        }
        return `$${numericPrice
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      },
    },
    {
      field: "brand",
      headerName: "Marca",
      width: 200,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            handleBrandChange(params.id, e.target.value, params.row)
          }
          sx={{ width: "100%" }}
        >
          {[...brands]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((brand) => (
              <MenuItem key={brand.id} value={brand.name}>
                {brand.name}
              </MenuItem>
            ))}
        </Select>
      ),
    },
    {
      field: "category",
      headerName: "Categoría",
      width: 200,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            handleCategoryChange(params.id, e.target.value, params.row)
          }
          sx={{ width: "100%" }}
        >
          {[...categories]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
        </Select>
      ),
    },
    {
      field: "warranty",
      headerName: "Garantía",
      width: 100,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "soldCount",
      headerName: "Vendidos",
      width: 120,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "carousel",
      headerName: "Carousel",
      width: 80,
      headerAlign: "center",
      renderCell: (params) => <Box>{params.value ? "Si" : "No"}</Box>,
    },
    {
      field: "banner",
      headerName: "Banner",
      width: 240,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "is_deleted",
      headerName: "Borrado",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => <Box>{params.value ? "Si" : "No"}</Box>,
    },
  ];

  const getProducts = async () => {
    try {
      const response = await axios.get(`${urlBack}/product/`, {
        withCredentials: true,
      });
      const newProducts = response.data.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          warranty: product.warranty,
          soldCount: product.soldCount,
          carousel: product.carousel,
          banner: product.banner,
          is_deleted: product.is_deleted,
          brand: product.ProductBrands[0].name,
          category: product.ProductCategories[0].name,
          stock: product.ProductStock.amount,
        };
      });

      setProducts(newProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    fetchCategories(dispatch);
    fetchBrands(dispatch);
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

  const handleCategoryChange = async (productId, newCategory, currentRow) => {
    try {
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });
      Swal.showLoading();
      const response = await fetchUpdateProduct(
        productId,
        {
          price: currentRow.price,
          categoryName: newCategory,
        },
        authData.jwt
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: "Categoria actualizada correctamente",
        });
        getProducts();
        return newCategory;
      } else {
        Swal.fire({
          icon: "error",
          title: "Operación fallida",
          text: "No se pudo actualizar la categoria",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Desconocido",
        text: "Ha ocurrido un error al intentar actualizar la categoría",
      });
    }
  };

  const handleBrandChange = async (productId, newBrand, currentRow) => {
    try {
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });
      Swal.showLoading();
      const response = await fetchUpdateProduct(
        productId,
        {
          price: currentRow.price,
          brandName: newBrand,
        },
        authData.jwt
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: "Categoria actualizada correctamente",
        });
        getProducts();
        return newBrand;
      } else {
        Swal.fire({
          icon: "error",
          title: "Operación fallida",
          text: "No se pudo actualizar la categoria",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Desconocido",
        text: "Ha ocurrido un error al intentar actualizar la categoría",
      });
    }
  };

  const handleDelete = async (selectedRows) => {
    try {
      if (selectedRows.length > 0) {
        const response = await Promise.all(
          selectedRows.map((id) => {
            return logicalDeleteProduct(id, authData.jwt);
          })
        );
        let msg = response.map((res) => res.data);
        msg = msg.join(", ");
        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: msg,
        });
        getProducts();
        setRowSelected([]);
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

  const handleCarousel = async (selectedRows) => {
    try {
      if (selectedRows.length > 0) {
        const response = await Promise.all(
          selectedRows.map((id) => {
            return addToCarouselProduct(id, authData.jwt);
          })
        );
        let msg = response.map((res) => res.data);
        msg = msg.join(", ");
        Swal.fire({
          icon: "success",
          title: "Operación Exitosa",
          text: msg,
        });
        getProducts();
        setRowSelected([]);
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

        const updateData = {
          name: newRow.name,
          price: newRow.price,
          warranty: newRow.warranty,
          soldCount: newRow.soldCount,
          carousel: newRow.carousel,
          banner: newRow.banner,
          stock: newRow.stock,
          brandName: newRow.brand,
          categoryName: newRow.category,
        };

        const response = await fetchUpdateProduct(
          productId,
          updateData,
          authData.jwt
        );
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
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el producto",
            text: response.message || "Error desconocido",
          });
        }
      }
      return newRow;
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
                handleCarousel,
                dataName: "Lista de productos",
                showQuickFilter: true,
                selectedRows: rowSelected,
                showCarouselIcon: true,
              },
            }}
            getRowClassName={(params) => {
              return params.row.is_deleted
                ? `row--deleted`
                : params.row.carousel
                ? `row--carousel`
                : `row`;
            }}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={rowSelected}
            rows={products}
            columns={columns}
            pageSize={5}
            localeText={language.components.MuiDataGrid.defaultProps.localeText}
            editMode="cell"
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                  is_deleted: false,
                  carousel: false,
                  banner: false,
                },
              },
            }}
          />
          {loading && <LoadingProgress />}
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "25px", fontWeight: "bold" }}
          >
            Esato del producto segun color
          </Typography>
          <Box sx={{ display: "flex", gap: "50px", justifyContent: "center" }}>
            <Typography sx={{ fontWeight: "600" }}>🟦 Carousel</Typography>
            <Typography sx={{ fontWeight: "600" }}>🟥 Eliminado</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductsTable;
