//HOOKS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//MATERIAL UI
import { Typography } from "@mui/material";
//COMPONENTS
import ProductBox from "../../components/ProductsBox/ProductsBox.component";
//REDUX

const CategoriesView = () => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/category/filter/${categoryName}`
        );
        const data = await response.json();
        console.log("Category Products:", data);
        setCategoryProducts(data);
      } catch (error) {
        console.error("Error fetching category products", error);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <div>
      <Typography variant="h3" sx={{ color: "red" }}>
        Productos de la categoría: {categoryName}
      </Typography>

      {/* {categoryProducts.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
        </div>
      ))} */}
      <ProductBox products={categoryProducts} />
    </div>
  );
};

export default CategoriesView;
