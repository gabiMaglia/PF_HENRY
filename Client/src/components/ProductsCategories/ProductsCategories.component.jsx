//HOOKS
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
//MATERIAL UI
import {
  Typography,
  Box,
  CardContent,
  CardMedia,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CircularProgress from "@mui/material/CircularProgress";

const backUrl = import.meta.env.VITE_BACKEND_URL;

const ProductsCategoriesComponent = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isDesired, setIsDesired] = useState(false);
  const [loading, setLoading] = useState(true);

  const fectData = async () => {
    try {
      const { data } = await axios.get(
        `${backUrl}/category/filter/${categoryName}`
      );
      setCategoryProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error, "Error al obtener los productos de la categoría");
      setLoading(false);
    }
  };

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    navigate(`/products/filters/${categoryName}`);
  };

  const handleDesiredClick = () => {
    setIsDesired(!isDesired);
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            marginTop: "50px"
          }}
        >
          <CircularProgress
            sx={{ color: "#fd611a" }}
            size={50}
            thickness={4}
          />
        </Box>
      ) : (
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  <BookmarkIcon
                    onClick={handleDesiredClick}
                    sx={{
                      position: "relative",
                      top: "20px",
                      right: "-30px",
                      transform: "translateY(-50%)",
                      color: isDesired ? "#fd611a" : "gray",
                    }}
                  />
                </Box>
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
      )}
    </>
  );
};

export default ProductsCategoriesComponent;
