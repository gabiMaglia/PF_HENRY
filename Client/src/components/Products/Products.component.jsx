//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import { Box, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
//COMPONENTS
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.component";
//REDUCERS
import { fetchAllProducts } from "../../redux/slices/ProductSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, filteredProductsByCategory, filteredProductsByBrand } =
    useSelector((state) => state.product);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fd611a",
        dark: "#fd611a"[700],
      },
    },
  });

  const cardsPage = 8;

  let productsToDisplay = products;

  if (filteredProductsByCategory.length > 0) {
    productsToDisplay = filteredProductsByCategory;
  }
  if (filteredProductsByBrand.length > 0) {
    productsToDisplay = filteredProductsByBrand;
  }

  const pageCount = Math.ceil(productsToDisplay?.length / cardsPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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

        <ProductBox
          products={productsToDisplay}
          currentPage={currentPage}
          productsPerPage={cardsPage}
        />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            color="primary"
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ color: "black" }}
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Products;
