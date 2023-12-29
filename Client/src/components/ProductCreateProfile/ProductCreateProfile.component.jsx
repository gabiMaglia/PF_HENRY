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
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("selecciona una categoria");
  const [newCategory, setNewCategory] = useState("");
  const [isUrlInput, setIsUrlInput] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    soldCount: 0,
    warranty: "",
    categoryName: isOtherCategory ? newCategory : [categoryName],
    brandName: "",
    images: [],
  });
  console.log(values);
  const handlerAddImage = ({ target }) => {
    setValues({
      ...values,
      images: [...values.images, imageURL], // Corrected part
    });
  };
  const handlerImageChange = (e) => {
    setImageURL(e.target.value);
  };
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "images" && !isUrlInput) {
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
    // Agregar lógica para enviar los datos al servidor o realizar otras acciones.
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
              name="warranty"
              label="garantia del producto"
              value={values.warranty}
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
            {!isUrlInput ? (
              <Input
                inputProps={{ multiple: true }}
                type="file"
                name="images"
                onChange={handleChange}
              />
            ) : (
              <>
                <TextField
                  label="URL de la imagen"
                  name="imageUrl"
                  required
                  onChange={handlerImageChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => handlerAddImage(event)}
                >
                  agregar imagen
                </Button>
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsUrlInput(!isUrlInput)}
            >
              {!isUrlInput ? "Ingresar URL" : "Cargar desde archivo"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ul>
              {values.images.map((image, index) => (
                <li key={index}>
                  {image.name||image}
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
