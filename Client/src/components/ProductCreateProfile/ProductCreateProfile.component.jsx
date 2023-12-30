import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Input,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../services/categoriesServices";
import { fetchAddProduct } from "../../services/productServices";
import Swal from "sweetalert2";
import { handleImageUpload } from "../../utils/cloudinaryUpload";
import { margin, padding } from "@mui/system";

const ProductCreateProfileComponent = () => {
  const fileInputRef = useRef(null);
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
  const [imagePreviews, setImagePreviews] = useState([]);

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

    setImagePreviews([...imagePreviews, imageURL]);
    setImageURL("");
  };

  const handlerImageChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "images" && !isUrlInput) {
      const selectedImages = Array.from(files);
      setValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...selectedImages],
      }));

      const selectedPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...selectedPreviews,
      ]);
    } else if (name === "imageUrl") {
      setImageURL(value);
    } else if (name === "categoryName") {
      setCategoryName(value);
      if (value === "otra") {
        setIsOtherCategory(true);
      } else {
        setIsOtherCategory(false);
      }
    } else if (name === "newCategory") {
      setNewCategory(value);
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

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let array = [];
    if (isUrlInput) {
      const array2 = await uploadCloudinaryUrl(values.images, "products");
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
    setImagePreviews([]); 
    setImageURL("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ mt: "1%", color: "#fd611a" }}>
        Creación de un producto
      </Typography>
      <Typography>
        Para crear un producto nuevo complete el siguiente formulario
      </Typography>
      <FormControl
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <TextField
            name="name"
            label="Nombre del producto"
            value={values.name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            name="price"
            label="precio del producto($)"
            value={values.price}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            multiline
            fullWidth
            rows={2}
            label="Descripción del producto"
            name="description"
            value={values.description}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Box>
        <Box>
          <TextField
            name="warranty"
            label="garantia del producto"
            fullWidth
            value={values.warranty}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Box>
        <Box>
          <TextField
            name="stock"
            label="unidades ingresadas"
            value={values.stock}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            name="brandName"
            label="marca"
            value={values.brandName}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
        </Box>
        <Box>
          <Select
            name="categoryName"
            labelId="categoria del producto"
            label="categoria"
            value={isOtherCategory ? "otra" : categoryName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem
              value="selecciona una categoria"
              sx={{
                overflowY: "auto",
              }}
            >
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
              variant="outlined"
              fullWidth
            />
          )}
        </Box>
        <Box>
          {!isUrlInput ? (
            <FormControl fullWidth>
              <Input
                type="file"
                name="images"
                inputProps={{ multiple: true }}
                inputRef={fileInputRef}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
          ) : (
            <>
              <TextField
                label="URL de la imagen"
                name="imageUrl"
                required
                variant="outlined"
                onChange={handlerImageChange}
                fullWidth
              />
              <Box sx={{ borderRadius: 2, backgroundColor: "#fd611a" }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  sx={{ color: "white" }}
                  onClick={(event) => handlerAddImage(event)}
                >
                  insertar URL
                </Button>
              </Box>
            </>
          )}
          <Box sx={{ borderRadius: 2, backgroundColor: "#fd611a" }}>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              sx={{ color: "white" }}
              onClick={() => setIsUrlInput(!isUrlInput)}
            >
              {!isUrlInput ? "Ingresar URL" : "Cargar desde archivo"}
            </Button>
          </Box>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row", backgroundColor:"red"}}>
  <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", backgroundColor:"red"}}>
    {imagePreviews.map((preview, index) => (
      <img
        key={index}
        src={preview}
        alt={`Preview-${index}`}
        style={{
          maxWidth: "100px",
          maxHeight: "100px",
          margin: "10px",
        }}
      />
    ))}
  </Box>
  <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
    <ul>
      {values.images.map((image, index) => (
        <li key={index} style={{margin:"35px"}}>
          {image.name || image}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveImage(index)}
            sx={{
              color: "white",
              borderRadius: 2,
              backgroundColor: "#fd611a",
            }}
          >
            Eliminar
          </Button>
        </li>
      ))}
    </ul>
  </Box>
</Box>
        <Box sx={{ borderRadius: 2, backgroundColor: "#fd611a" }}>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="outlined"
            color="inherit"
            fullWidth
            sx={{ color: "white" }}
          >
            Crear Producto
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default ProductCreateProfileComponent;
