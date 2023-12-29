import React, { useState, useEffect, useRef } from "react";
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
import { fetchAddProduct } from "../../services/productServices";
import Swal from "sweetalert2";
import { handleImageUpload } from "../../utils/cloudinaryUpload";

const ProductCreateProfileComponent = () => {
  const fileInputRef = useRef(null); //Referencia a un archivo
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

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
    soldCount: "0",
    warranty: "",
    categoryName: isOtherCategory ? newCategory : categoryName,
    brandName: "",
    images: [],
  });
console.log(values)
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  const handlerUpdateCloudinary = async (folderName) => {
    try {
      const file = fileInputRef.current.files;

      if (!file || file.length === 0) {
        return { error: true, response: "No se han seleccionado archivos" };
      }

      const newImagePromises = Array.from(file).map(async (f) => {
        try {
          console.log(f);
          return await handleImageUpload(f, folderName);
        } catch (error) {
          console.error("Error al subir imagen a Cloudinary:", error);
          throw error;
        }
      });

      const newImage = await Promise.all(newImagePromises);

      return newImage;
    } catch (error) {
      console.error("Error en la carga de imágenes:", error);
      return { error: true, response: "Error en la carga de imágenes" };
    }
  };
  const uploadCloudinaryUrl = async (urls, folderName) => {
    try {
      if (!urls || urls.length === 0) {
        throw new Error("No se han proporcionado URLs");
      }
  
      const newImagePromises = urls.map(async (url) => {
        try {
          const uploadedImage = await handleImageUpload(url, folderName);
          console.log("Imagen subida con éxito:", uploadedImage);
          return uploadedImage;
        } catch (error) {
          console.error("Error al subir imagen a Cloudinary:", error.message);
          throw error;
        }
      });
  
      const newImage = await Promise.all(newImagePromises);
  
      return newImage;
    } catch (error) {
      console.error("Error en la carga de imágenes:", error.message);
      return { error: true, response: "Error en la carga de imágenes" };
    }
  };

  const handlerAddImage = ({ target }) => {
    setValues({
      ...values,
      images: [...values.images, imageURL],
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
          categoryName: [value],
        }));
      }
    } else if (name === "newCategory") {
      setNewCategory(value);
      setValues((prevValues) => ({
        ...prevValues,
        categoryName: [value],
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let array = [];
    if (isUrlInput) {
      const array2 = await uploadCloudinaryUrl(values.images,"products");
      array = array2;
    } else {
      const array2 = await handlerUpdateCloudinary("products");
      array = array2;
    }

    if (array.error) {
      Swal.fire({
        icon: "error",
        title: "Error al subir la imagen a Cloudinary",
        text: "Por favor, inténtelo de nuevo.",
      });
    }

    const obj = {
      ...values,
      images: array,
    };

    fetchAddProduct(obj, dispatch);
    setValues({
      name: "",
      price: "",
      description: "",
      stock: "",
      soldCount: "0",
      warranty: "",
      categoryName: isOtherCategory ? newCategory : [categoryName],
      brandName: "",
      images: [],
    });
    setImageURL("");
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
              rows={2}
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
            <TextField
              name="brandName"
              label="marca"
              value={values.brandName}
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
                inputRef={fileInputRef}
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
                  {image.name || image}
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
