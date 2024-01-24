//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import { Box, Pagination, Stack } from "@mui/material";
//COMPONENTS
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.component";
import SafePurchase from "../SafePurchase/SafePurchase.component";
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

  const handlePageChange = (event, value) => {
    setValue(value);
    dispatch(selectPage(value));
  };

  useEffect(() => {
    inputName !== "" ? fetchSearch(inputName) : dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FiltersSorting />

        <ProductBox products={productsToShow} />

        <Stack
          spacing={2}
          sx={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
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

            sx={{
              color: "black",
              boundaryCount: { xs: 1, md: 4 },
            }}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          marginBottom: {xxs:5, xs:0},
        }}
      >
        <SafePurchase />
      </Box>
    </>
  );
};

export default Products;
