import { Box } from "@mui/material";
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.componets";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

const Products = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fd611a",
        dark: "#fd611a"[700],
      },
    },
  });
  const { products } = useSelector((state) => state.product);

  const cardsPage = 8;

  const pageCount = Math.ceil(products?.length / cardsPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

        <ProductBox
          products={products}
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
