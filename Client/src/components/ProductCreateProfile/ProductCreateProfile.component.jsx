<<<<<<< HEAD
import { Box, Button, TextField, Grid, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../services/ProductServices";
=======
//MATERIAL UI
import { Box } from "@mui/material";

>>>>>>> c3080270e5b99918d45d696b13f3c097bb6ff5f0
const ProductCreateProfileComponent = () => {
  //HOOKS
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  //extraigo todas las categorias 
  const categories = allProducts
    .map((product) => {
      return product.ProductCategories.map((categoria) => categoria.name);
    })
    .flat();
  //defino el estado del form
  const [categoryName, setCategoryName] = useState('selecciona una categoria');
   const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryName: categoryName,
    brandName: "",
    images: [],
  });

  const handleChange = (event) => {
    if (event.target.name === "categoryName") {
      if (event.target.value !== 'categoria') {
        setCategoryName(event.target.value);
      }
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          mt: "1.2em",
        }}
      >
        Contenido PRODUCT CREATE (admin)
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nombre del producto"
                value={values.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="price"
                label="precio del producto($)"
                value={values.price}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="decripcion del producto"
                value={values.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="stock"
                label="unidades ingresadas"
                value={values.stock}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                name="categoryName" 
                labelId="categoria del producto"
                id="categoria"
                label="categoria"
                value={categoryName} 
                onChange={handleChange} 
              >
                <MenuItem value='selecciona una categoria'>selecciona una categoria</MenuItem>
                {categories.map((Category) => {
                  return (
                    <MenuItem key={Category} value={Category}>
                      {Category}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Crear Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default ProductCreateProfileComponent;
