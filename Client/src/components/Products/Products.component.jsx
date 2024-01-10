//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
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
    inputName !== "" ? fetchSearch(inputName) : dispatch(fetchAllProducts());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setValue(value);
    dispatch(selectPage(value));
  };

  return (
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

      <Stack spacing={2} sx={{ mt: { xs: 2, lg: 3 }, mb: { xs: 10 } }}>
        <Pagination
          variant="outlined"
          shape="rounded"
          color="primary"
          count={totalPages}
          value={value}
          page={currentPage + 1}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          sx={{ color: "black", boundaryCount: { xs: 2, md: 3 } }}
        />
      </Stack>
    </Box>
  );
};

export default Products;
