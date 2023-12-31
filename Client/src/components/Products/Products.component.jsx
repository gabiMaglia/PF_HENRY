//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Pagination, Stack } from "@mui/material";
//COMPONENTS
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.component";
//REDUX
import { selectPage } from "../../redux/slices/productSlice";
//SERVICES
import { fetchSearch, fetchAllProducts } from "../../services/productServices";

const Products = () => {
  const dispatch = useDispatch();

  const { productsToShow, inputName, totalPages, currentPage } = useSelector(
    (state) => state.product
  );

  const [value, setValue] = useState(1);

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

  const handlePageChange = (event, value) => {
    console.log(value);
    setValue(value);
    dispatch(selectPage(value));
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
            value={value}
            page={currentPage + 1}
            onChange={handlePageChange}
            boundaryCount={3}
            showFirstButton
            showLastButton
            sx={{ color: "black" }}
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Products;
