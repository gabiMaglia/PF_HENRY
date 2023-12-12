import { Box } from "@mui/material";
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.componets";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchSearch, search } from "../../redux/slices/ProducSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts } = useSelector((state) => state.product);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fd611a",
        dark: "#fd611a"[700],
      },
    },
  });

  const cardsPage = 8;
  
  const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : products;

  const pageCount = Math.ceil(productsToDisplay?.length / cardsPage);
  // const pageCount = Math.ceil(products?.length / cardsPage);
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
          // products={products}
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
