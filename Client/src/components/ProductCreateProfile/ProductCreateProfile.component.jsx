import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../services/categoriesServices";

const ProductCreateProfileComponent = () => {
  // HOOKS
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    fetchCategories(dispatch);
  }, [dispatch]);

  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("selecciona una categoria");
  const [newCategory, setNewCategory] = useState("");
  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryName: isOtherCategory ? newCategory : categoryName,
    brandName: "",
    images: [],
  });
  console.log(values);
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "images") {
      setValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...files],
      }));
    } else if (name === "categoryName") {
      if (value === "otra") {
        setIsOtherCategory(true);
      } else {
        setIsOtherCategory(false);
        setCategoryName(value);
        setValues((prevValues) => ({
          ...prevValues,
          categoryName: value,
        }));
      }
    } else if (name === "newCategory") {
      setNewCategory(value);
      setValues((prevValues) => ({
        ...prevValues,
        categoryName: value,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setValues((prevValues) => {
      const updatedImages = [...prevValues.images];
      updatedImages.splice(index, 1);
      return {
        ...prevValues,
        images: updatedImages,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
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
          <Grid item xl={12}>
            <TextField
              multiline
              rows={5}
              label="Descripción del producto"
              name="description"
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
              value={isOtherCategory ? "otra" : categoryName}
              onChange={handleChange}
            >
              <MenuItem value="selecciona una categoria">
                selecciona una categoria
              </MenuItem>
              {categories.map((Category) => (
                <MenuItem key={Category.name} value={Category.name}>
                  {Category.name}
                </MenuItem>
              ))}
              <MenuItem value="otra">Otra</MenuItem>
            </Select>
            {isOtherCategory && (
              <TextField
                name="newCategory"
                label="Nueva Categoria"
                value={newCategory}
                onChange={handleChange}
                required
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="brandName"
              label="ingrese la marca"
              value={values.brandName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
          <Input inputProps={{ multiple: true }} type="file" name="images" onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <ul>
              {values.images.map((image, index) => (
                <li key={index}>
                  {image.name}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Crear Producto
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProductCreateProfileComponent;
