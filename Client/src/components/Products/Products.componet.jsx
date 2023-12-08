import { Box } from "@mui/material";
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.componets";
import data from "../../dataBase/bdd.json";

const Products = () => {
  const { products } = data;

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
      <ProductBox products={products} />
    </Box>
  );
};

export default Products;
