//HOOKS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//MATERIAL UI
import { Typography, Box, CircularProgress } from "@mui/material";
//COMPONENTS
import CardProduct from "../ProductCard/ProductCard.component";

const backUrl = import.meta.env.VITE_BACKEND_URL;

const ProductsCategoriesComponent = () => {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${backUrl}/category/filter/${categoryName}`,
          {
            withCredentials: true,
          }
        );
        const filteredData = data.filter(
          (product) => product.is_deleted === false
        );
        setCategoryProducts(filteredData);
        // setCategoryProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryName]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            marginTop: "50px",
          }}
        >
          <CircularProgress sx={{ color: "#fd611a" }} size={50} thickness={4} />
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              backgroundColor: "#000",
              width: "100%",
              height: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                textTransform: "uppercase",
                fontWeight: "900",
              }}
              fontWeight={"bold"}
              fontSize={24}
              m={4}
              align={"center"}
            >
              <span style={{ textTransform: "uppercase", fontWeight: "900" }}>
                Productos de la categoría:
              </span>{" "}
              {categoryName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "0 50px 50px 50px",
              gap: "20px 70px",
              width: "75%",
              marginInline: "auto",
              p: 4,
            }}
          >
            {categoryProducts.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                sx={{
                  display: "flex",
                  padding: 0,
                  m: 1,
                  cursor: "pointer",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductsCategoriesComponent;
