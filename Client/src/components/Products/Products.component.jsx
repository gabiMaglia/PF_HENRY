//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Pagination, Stack } from "@mui/material";
//COMPONENTS
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.component";
//REDUCERS
import { fetchSearch, fetchAllProducts } from "../../services/ProductServices";
import { nextPage } from "../../redux/slices/ProductSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { productsToShow, inputName, totalPages, currentPage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    inputName !== ""
      ? dispatch(fetchSearch(inputName))
      : dispatch(fetchAllProducts());
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fd611a",
        dark: "#fd611a"[700],
      },
    },
  });

  console.log(productsToShow, "all");

  const handlePageChange = (event, value) => {
    dispatch(nextPage(value - 1));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <FiltersSorting />

        <ProductBox products={productsToShow} />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            color="primary"
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}
            sx={{ color: "black" }}
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Products;
