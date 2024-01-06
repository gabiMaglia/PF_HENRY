//HOOKS
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import {
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import styled from "@emotion/styled";
//DATA BASE
import { fetchCategories } from "../../services/categoriesServices";
//UTILS
import { brands } from "../../utils/objectsTexts";
//SERVICES
import { fetchProductsByBrand } from "../../services/productServices";
//REDUX
import {
  resetState,
  orderPrice,
  filterByBrand,
  filterByCategory,
} from "../../redux/slices/productSlice";

const FiltersSorting = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [selectedBrand, setSelectedBrand] = useState("default");
  const [selectedPrice, setSelectedPrice] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (categoryName) => {
    dispatch(filterByCategory(categoryName));
    setSelectedCategory(categoryName);
    setSelectedBrand("default");
    setSelectedPrice("default");
  };

  const handleSelectBrand = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleFilterBrand = () => {
    dispatch(filterByBrand(selectedBrand));
    dispatch(orderPrice(selectedPrice));
  };

  const handleOrderPrice = (e) => {
    dispatch(orderPrice(e.target.value));
    setSelectedPrice(e.target.value);
  };

  const clearFilters = () => {
    setSelectedBrand("default");
    setSelectedPrice("default");

    dispatch(filterByCategory("all"));
    dispatch(filterByBrand("default"));
    dispatch(resetState());

    setSelectedCategory("all");
  };

  const Selects = styled(Select)({
    height: 40,
    marginRight: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 700,
  });

  const Buttons = styled(Button)({
    marginLeft: 20,
    width: 100,
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "black",
    },
  });

  const CategorieMedia = styled(CardMedia)({
    height: 50,
    width: 50,
    objectFit: "cover",
    margin: "auto",
  });

  const Options = styled(MenuItem)({
    fontSize: 20,
    fontWeight: 700,
  });

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  return (
    <>
      <Container
        maxWidth="2200px"
        height="auto"
        sx={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(3,1fr)", lg: "repeat(6,1fr)" },
            flexDirection: "row",
            ml: { xs: 1, lg: 10 },
            mb: 2,
            width: { xs: "100%", md: "80%", lg: "60%", xl: "50%" },
          }}
        >
          {categories.map((categorie) => (
            <Button
              key={categorie.id}
              sx={{
                padding: (1, 1, 1, 1),
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                backgroundColor:
                  categorie.name === selectedCategory ? "#b54410" : "#fd611a",
                width: 90,
                height: 90,
                ml: { xs: 3, lg: -2.1 },
                mt: 2,
                borderColor:
                  categorie.name === selectedCategory ? "white" : undefined,
                borderStyle: "solid",
                borderWidth: 2,
                "&:hover": { color: "black", backgroundColor: "#b54410" },
              }}
              onClick={() => handleCategoryClick(categorie.name)}
            >
              <CategorieMedia
                component="img"
                src={categorie.image}
                alt={categorie.name}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  backgroundColor: "none",
                }}
              ></CategorieMedia>
              <Typography
                sx={{ color: "black", fontSize: 10, fontWeight: 700 }}
              >
                {categorie.name}
              </Typography>
            </Button>
          ))}
        </Box>
      </Container>
      <Box display="flex" alignItems="center">
        <Box display="flex" sx={{ flexDirection: { xs: "column", lg: "row" } }}>
          <FormControl
            sx={{
              mt: 2,
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Selects
              value={selectedBrand}
              onChange={handleSelectBrand}
              sx={{ width: { xs: 200, lg: 400 } }}
            >
              <Options value="default" disabled>
                Marca
              </Options>
              {brands.map((brand, i) => (
                <Options key={brand} value={brand}>
                  {brand}
                </Options>
              ))}
            </Selects>
          </FormControl>
          <FormControl
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Selects
              value={selectedPrice}
              onChange={handleOrderPrice}
              sx={{ width: { xs: 200, lg: 400 } }}
            >
              <Options value="default" disabled>
                Precio
              </Options>
              <Options value="desc">Mayor precio</Options>
              <Options value="asc">Menor precio</Options>
            </Selects>
          </FormControl>
        </Box>
        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            mr: { xs: 4 },
            position: "relative",
            left: "30px",
          }}
        >
          <Buttons
            variant="contained"
            onClick={handleFilterBrand}
            sx={{ mt: 2 }}
          >
            Filtrar
          </Buttons>
          <Buttons variant="outlined" onClick={clearFilters} sx={{ mt: 2 }}>
            Limpiar
          </Buttons>
        </Box>
      </Box>
    </>
  );
};

export default FiltersSorting;
