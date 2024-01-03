import { Box, Typography, Button } from "@mui/material";
import {
  GridCellEditStopReasons,
  GridLogicOperator,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchDelete } from "../../services/productServices";
import Swal from "sweetalert2";

const CustomToolbar = ({ setFilterButtonEl, rowSelected, getProducts }) => {
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
          Lista de productos
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

export default CustomToolbar;
