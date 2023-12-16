//HOOKS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//MATERIAL UI
import { Typography } from "@mui/material";
//COMPONENTS
//REDUX

const backUrl = import.meta.env.VITE_BACKEND_URL;

const CategoriesView = () => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  const fectData = async () => {
    try {
      const { data } = await axios.get(
        `${backUrl}/category/filter/${categoryName}`
      );
      setCategoryProducts(data);
    } catch (error) {
      console.log(error, "Error al obtener los productos de la categoría");
    }
  };

  useEffect(() => {
    fectData();
  }, [categoryName]);

  return (
    <div>
      <Typography variant="h3" sx={{ color: "red" }}>
        Productos de la categoría: {categoryName}
      </Typography>

      {categoryProducts.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesView;
