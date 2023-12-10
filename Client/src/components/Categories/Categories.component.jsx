import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import styled from "@emotion/styled";
import data from "../../DataBase/categories.json";

const FiltersSorting = () => {
  const { categories } = data;
  const marcas = ["Asus", "Nvidia", "Intel", "Steelseries", "Razer"];
  const [op1, setOp1] = useState("default");
  const [op2, setOp2] = useState("default");

  const handleMarca = (e) => {
    setOp1(e.target.value);
  };
  const handleCosto = (e) => {
    setOp2(e.target.value);
  };

  const clearFilters = () => {
    setOp1("default");
    setOp2("default");
  };

  const Selects = styled(Select)({
    width: 400,
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
    <Container
      maxWidth="2200px"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
            width: "80%",
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
                mt: 2,
                "&:hover": { color: "black", backgroundColor: "#fd611a" },
              }}
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
      <Box display="flex" flexDirection="row">
        <FormControl
          sx={{
            mt: 2,
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Selects value={op1} onChange={handleMarca}>
            <Options value="default" disabled>
              Marca
            </Options>
            {marcas.map((marca, i) => (
              <Options key={i} value={marca}>
                {marca}
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
          <Selects value={op2} onChange={handleCosto}>
            <Options value="default" disabled>
              Precio
            </Options>
            <Options value="ascending">Mayor precio</Options>
            <Options value="descending">Menor precio</Options>
          </Selects>

          <Buttons variant="contained">Filtrar</Buttons>
          <Buttons variant="outlined" onClick={clearFilters}>
            Limpiar
          </Buttons>
        </FormControl>
      </Box>
    </Container>
  );
};

export default FiltersSorting;
