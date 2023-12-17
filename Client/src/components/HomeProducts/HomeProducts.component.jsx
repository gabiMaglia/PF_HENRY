//HOOKS
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard.component";
import { Container, Typography } from "@mui/material";
//REDUX
import { fetchCategories } from "../../services/CategoriesServices";

const HomeProducts = ({ allProducts }) => {
  const dispatch = useDispatch();
  const homeProducts = allProducts.slice(0, 9);

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Typography paddingLeft={8} margin={2} fontWeight={"bold"} fontSize={24} sx={{ textTransform: "uppercase" }}>
        Utlimas Novedades
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginBottom: 5,
          gap: 2,
          [`@media (max-width: 1140px)`]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {homeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Container>
    </Container>
  );
};

export default HomeProducts;
