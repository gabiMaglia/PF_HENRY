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
//SERVICES
import { fetchCategories } from "../../services/categoriesServices";
import { fetchBrands } from "../../services/brandsServices";
//REDUX
import {
  resetState,
  orderPrice,
  filterByBrand,
  filterByCategory,
} from "../../redux/slices/productSlice";
//FIREBASE
import { filtersOrSortEvents } from "../../services/firebaseAnayticsServices";

const FiltersSorting = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const [selectedBrand, setSelectedBrand] = useState("default");
  const [selectedPrice, setSelectedPrice] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (categoryName) => {
    dispatch(filterByCategory(categoryName));
    setSelectedCategory(categoryName);
    setSelectedBrand("default");
    setSelectedPrice("default");
    filtersOrSortEvents(categoryName, "Category");
  };

  const handleSelectBrand = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleFilterBrand = () => {
    dispatch(filterByBrand(selectedBrand));
    dispatch(orderPrice(selectedPrice));
    filtersOrSortEvents(selectedBrand, "Brand");
  };

  const handleOrderPrice = (e) => {
    dispatch(orderPrice(e.target.value));
    setSelectedPrice(e.target.value);
    filtersOrSortEvents(e.target.value, "Price");
  };

  const clearFilters = () => {
    setSelectedBrand("default");
    setSelectedPrice("default");

    dispatch(filterByCategory("all"));
    dispatch(filterByBrand("default"));
    dispatch(resetState());

    setSelectedCategory("all");
  };

  const cantlg = Math.ceil(categories.length / 2);
  const cantmd = Math.ceil(categories.length / 3);
  const cantsm = Math.ceil(categories.length / 4);

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

    ml: { xs: 1, lg: -2.1 },
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
    dispatch(fetchBrands);
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
            //gridGap: { xs: 0, lg: 0 }, // Ajusta el espacio entre filas según el tamaño de la pantalla
            gridTemplateColumns: {
              xxs: "repeat(3,1fr)",
              xs: "repeat(3,1fr)",
              sm: `repeat(${cantsm}, 1fr)`,
              md: `repeat(${cantmd}, 1fr)`,
              lg: `repeat(${cantlg},1fr)`,
            },
            gridTemplateRows: {
              lg: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              sm: "repeat(4, 1fr)",
            },
            flexDirection: "row",
            //ml: { xs: 1, lg: 10 },
            mb: 2,
            width: { xs: "auto", md: "auto", lg: "auto", xl: "auto" },
          }}
        >
          {[...categories]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((categorie) => (
              <Button
                key={categorie.id}
                sx={{
                  padding: (1, 1, 1, 1),
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  backgroundColor:
                    categorie.name === selectedCategory ? "#b54410" : "#fd611a",
                  width: 100,
                  height: 100,
                  ml: { xxs: 1, xs: 1, sm: 1, md: 1, lg: 1 },
                  mr: { xxs: 1, xs: 1, sm: 1, md: 1, lg: 1 },
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
        <Box
          display="flex"
          sx={{ flexDirection: { xxs: "column", xs: "column", lg: "row" } }}
        >
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
              sx={{ width: { xxs: 200, xs: 200, lg: 400 } }}
            >
              <Options value="default" disabled>
                Marca
              </Options>
              {[...brands]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((brand) => (
                  <Options key={brand.name} value={brand.name}>
                    {brand.name}
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
              sx={{ width: { xxs: 200, xs: 200, lg: 400 } }}
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
            flexDirection: { xxs: "column", xs: "column", lg: "row" },
            mr: { xxs: 4, xs: 4 },
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
