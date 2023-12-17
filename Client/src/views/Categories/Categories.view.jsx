//HOOKS
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
//MATERIAL UI
import { Typography, Box, CardContent, CardMedia, Card, Button } from "@mui/material";
import { styled } from "@mui/system";

const backUrl = import.meta.env.VITE_BACKEND_URL;

const CategoriesView = () => {
  const navigate = useNavigate();
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

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    navigate(`/products/filters/${categoryName}`);
  };

  const ProductCard = styled(Card)({
    width: 300,
    height: 350,
  });

  const ProductMedia = styled(CardMedia)({
    height: 180,
    width: 180,
  });

  const ProductPrice = styled(Typography)({
    color: "#fd611a",
  });

  useEffect(() => {
    fectData();
  }, [categoryName]);

  return (
    <>
      <Box>
        <Typography
          fontWeight={"bold"}
          fontSize={24}
          align={"center"}
          sx={{
            padding: "30px",
          }}
        >
          <span style={{ textTransform: "uppercase", fontWeight: "900" }}>
            Productos de la categoría:
          </span>{" "}
          {categoryName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "0 50px 50px 50px",
            gap: "20px 70px",
            width: "75%",
            margin: "auto",
          }}
        >
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              sx={{
                display: "flex",
                padding: 0,
                m: 1,
                cursor: "pointer",
                margin: 0,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {categoryName && (
                <Typography
                  variant="subtitle2"
                  onClick={handleCategoryClick}
                  sx={{ paddingTop: "20px", zIndex: "1000" }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#fd611a",
                      textTransform: "uppercase",
                    }}
                  >
                    categoria:
                  </span>{" "}
                  {categoryName}
                </Typography>
              )}
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box>
                  <ProductMedia
                    component="img"
                    alt={product.name}
                    src={product.ProductImages[0].address}
                    sx={{
                      padding: "20px",
                      objectFit: "cover",
                      margin: "auto",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      color="textPrimary"
                      align="center"
                      sx={{ marginTop: "-20px" }}
                    >
                      {product.name}
                    </Typography>
                  </CardContent>
                  <ProductPrice
                    variant="subtitle1"
                    align="center"
                    sx={{
                      fontWeight: "900",
                      marginTop: "auto",
                      marginBottom: 24,
                      fontSize: 28,
                    }}
                  >
                    ${product.price}
                  </ProductPrice>
                </Box>
              </Link>
            </ProductCard>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CategoriesView;
