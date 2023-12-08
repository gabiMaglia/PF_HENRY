import { Box } from "@mui/material";
import FiltersSorting from "../Categories/Categories.component";
import ProductBox from "../ProductsBox/ProductsBox.componets";
import data from "../../dataBase/bdd.json";

const Products = () => {
  const { products } = data;

  return (
    <Box>
      <FiltersSorting />
      <ProductBox products={products} />
    </Box>
  );
};

export default Products;
