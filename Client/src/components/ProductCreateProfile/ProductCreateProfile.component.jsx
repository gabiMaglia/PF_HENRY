//HOOKS
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
//MATERIAL UI
import DeleteIcon from "@mui/icons-material/Delete";
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
//SERVICES
import { fetchCategories } from "../../services/categoriesServices";
import { fetchAddProduct } from "../../services/productServices";
//SWEET ALERT
import Swal from "sweetalert2";
//UTILS
import { handleImageUpload } from "../../utils/cloudinaryUpload";
//HELPERS
import validationsCreate from "../../helpers/productValidate";
import { display } from "@mui/system";
import { fetchBrands } from "../../services/brandsServices";

const ProductCreateProfileComponent = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  console.log(brands);

  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [isOtherBrand, setIsOtherBrand] = useState(false);

  const [categoryName, setCategoryName] = useState("selecciona una categoria");
  const [brand, setBrand] = useState("selecciona una marca");

  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");

  const [isUrlInput, setIsUrlInput] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    soldCount: "0",
    warranty: "",
    categoryName: isOtherCategory ? newCategory : categoryName,
    brandName: isOtherBrand ? newBrand : brand,
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  useEffect(() => {
    fetchCategories(dispatch);
    fetchBrands(dispatch);
  }, []);
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

    switch (name) {
      case "images":
        if (!isUrlInput) {
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
        }
        break;

      case "imageUrl":
        setImageURL(value);
        break;

      case "categoryName":
        setValues((prevValues) => ({
          ...prevValues,
          categoryName: isOtherCategory ? newCategory : [value],
        }));
        setIsOtherCategory(value === "otra");
        break;

      case "newCategory":
        setNewCategory(value);
        setValues((prevValues) => ({
          ...prevValues,
          categoryName: isOtherCategory ? [value] : prevValues.categoryName,
        }));
        break;
      case "brandName":
        setValues((prevValues) => ({
          ...prevValues,
          brandName: isOtherBrand ? newBrand : value,
        }));
        setIsOtherBrand(value === "otra");
        break;

      case "newBrand":
        setNewBrand(value);
        setValues((prevValues) => ({
          ...prevValues,
          brandName: isOtherBrand ? value : prevValues.brandName,
        }));
        break;

      default:
        setValues((prevValues) => {
          const updatedValues = { ...prevValues, [name]: value };
          return updatedValues;
        });
    }

    const errorObject = validationsCreate(values);
    setErrors(errorObject);
  };
  const handlerUpdateCloudinary = async (folderName) => {
    try {
      const file = fileInputRef.current.files;

      if (!file || file.length === 0) {
        return { error: true, response: "No se han seleccionado archivos" };
      }

      const newImagePromises = Array.from(file).map(async (f) => {
        try {
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    let array = [];

    const errorObject = validationsCreate(values);
    setErrors(errorObject);
    if (Object.keys(errorObject).length !== 0) {
      console.log(values);
      Swal.fire({
        icon: "error",
        title: "datos incorrectos",
        text: "Por favor verifique los datos e inténtelo de nuevo.",
      });
    } else {
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
      console.log(obj);

      // Muestra una alerta de que la creación está en proceso
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });

      const response = fetchAddProduct(obj, dispatch);
      response
        .then((res) => {
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Producto creado exitosamente",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Algo salio mal",
            text: "Por favor, intente nuevamente",
          });
        });

      setValues({
        name: "",
        price: "",
        description: "",
        stock: "",
        soldCount: "0",
        warranty: "",
        categoryName: isOtherCategory ? newCategory : [categoryName],
        brandName: isOtherBrand ? newBrand : brand,
        images: [],
      });
      setBrand("selecciona una marca");
      setCategoryName("selecciona una categoria");
      setImagePreviews([]);
      setImageURL("");
    }
  };
  console.log(values);
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

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Typography variant="h4" sx={{ mt: "1%", color: "#fd611a" }}>
        Creación de un producto
      </Typography>
      <Typography>
        Para crear un producto nuevo complete el siguiente formulario
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
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
              helperText={errors.e1}
              error={Boolean(errors.e1)}
            />
          </Box>
          <Box>
            <TextField
              name="price"
              label="Precio del producto($)"
              value={values.price}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              helperText={errors.e2 ? errors.e2 : errors.e9}
              error={Boolean(errors.e2) || Boolean(errors.e9)}
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
              helperText={errors.e3}
              error={Boolean(errors.e3)}
            />
          </Box>
          <Box>
            <TextField
              name="warranty"
              label="Garantía del producto"
              fullWidth
              value={values.warranty}
              onChange={handleChange}
              variant="outlined"
              required
              helperText={errors.e7}
              error={Boolean(errors.e7)}
            />
          </Box>
          <Box>
            <TextField
              name="stock"
              label="Unidades ingresadas"
              value={values.stock}
              onChange={handleChange}
              variant="outlined"
              required
              fullWidth
              helperText={errors.e8 ? errors.e8 : errors.e10}
              error={Boolean(errors.e8) || Boolean(errors.e10)}
            />
          </Box>
          <Box>
            <Select
              id="brandSelect"
              name="brandName"
              label="Marca"
              value={isOtherBrand ? "otra" : values.brandName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="selecciona una marca">
                selecciona una marca
              </MenuItem>
              {[...brands]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((brand) => (
                <MenuItem key={brand.name} value={brand.name}>
                  {brand.name}
                </MenuItem>
              ))}
              <MenuItem value="otra">Otra</MenuItem>
            </Select>
            {isOtherBrand && (
              <TextField
                name="newBrand"
                label="Nueva Marca"
                value={newBrand}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
              />
            )}
          </Box>
          <Box>
            <Select
              id="categorySelect"
              name="categoryName"
              label="Categoria"
              value={isOtherCategory ? "otra" : values.categoryName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              error={Boolean(errors.e6)}
            >
              <MenuItem value="selecciona una categoria">
                selecciona una categoria
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value="otra">Otra</MenuItem>
            </Select>
            {errors.e6 && <Typography color="error">{errors.e6}</Typography>}
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
                  sx={{
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: 2,
                    backgroundColor: "#fd611a",
                    color: "white",
                  }}
                />
                {errors.e4 && (
                  <Typography variant="caption" color="error">
                    {errors.e4}
                  </Typography>
                )}
              </FormControl>
            ) : (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <TextField
                  label="URL de la imagen"
                  name="imageUrl"
                  value={imageURL}
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
              </Box>
            )}
            {errors.e4 && isUrlInput ? (
              <Typography variant="caption" color="error">
                Ingrese una URL valida
              </Typography>
            ) : null}
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
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {imagePreviews.map((preview, index) => (
                  <Button
                    key={index}
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      ":hover": {
                        transform: "scale(1.2,1.2)",
                        margin: "10px",
                        "& .MuiIconButton-root": { display: "block" },
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                      },
                      maxWidth: "100px",
                      maxHeight: "100px",
                      transition: "1s",
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "50%",
                        display: "none",
                        width: "50px",
                        height: "50px",
                        color: "black",
                        transform: "translate(50%, -50%)",
                      }}
                      className="MuiIconButton-root"
                    />
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview-${index}`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                      }}
                    />
                  </Button>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              ></Box>
            </Box>
            <Box sx={{ borderRadius: 2, backgroundColor: "#fd611a" }}>
              <Button
                type="submit"
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{ color: "white" }}
              >
                Crear Producto
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
export default ProductCreateProfileComponent;
