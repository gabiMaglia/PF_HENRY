//HOOKS
import { useState } from "react";
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
import data from "../../DataBase/categories.json";
//UTILS
import { brands } from "../../utils/objectsTexts";
//REDUCERS
import {
  fetchProductsByCategory,
  fetchProductsByBrand,
} from "../../services/ProductServices";
import {
  resetState,
  orderPrice,
  filterByBrand,
  filterByCategory,
} from "../../redux/slices/ProductSlice";

const FiltersSorting = () => {
  const dispatch = useDispatch();
  const { categories } = data;
  const [selectedBrand, setSelectedBrand] = useState("default");
  const [selectedPrice, setSelectedPrice] = useState("default");

  const handleCategoryClick = async (categoryName) => {
    await dispatch(fetchProductsByCategory(categoryName));
    dispatch(filterByCategory(categoryName));
  };

  const handleSelectBrand = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleFilterBrand = async () => {
    await dispatch(fetchProductsByBrand(selectedBrand));
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
                backgroundColor: "#fd611a",
                width: 90,
                height: 90,
                ml: { xs: 3, lg: -2.1 },
                mt: 2,
                "&:hover": { color: "black", backgroundColor: "#fd611a" },
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
                  backgroundColor: "#fd611a",
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
              <Options value="ascending">Mayor precio</Options>
              <Options value="descending">Menor precio</Options>
            </Selects>
          </FormControl>
        </Box>
        <Box
          display="flex"
          sx={{ flexDirection: { xs: "column", lg: "row" }, mr: { xs: 4 } }}
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
