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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
//SERVICES
import { fetchCategories } from "../../services/categoriesServices";
import { fetchAddProduct } from "../../services/productServices";
import { fetchBrands } from "../../services/brandsServices";
//SWEET ALERT
import Swal from "sweetalert2";
//UTILS
import { handleImageUpload } from "../../utils/cloudinaryUpload";
//HELPERS
import {
  validateField,
  validationsCreate,
} from "../../helpers/productValidate";
import { display } from "@mui/system";
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";

const ProductCreateProfileComponent = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const [isOtherBrand, setIsOtherBrand] = useState(false);
  const [categoryName, setCategoryName] = useState("Selecciona una categoria");
  const [brand, setBrand] = useState("Selecciona una marca");
  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [isUrlInput, setIsUrlInput] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [carouselData, setCarouselData] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
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
    carousel: carouselData,
    banner: "",
  });

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const [imagePreviews, setImagePreviews] = useState([]);
  useEffect(() => {
    fetchCategories(dispatch);
    fetchBrands(dispatch);
  }, []);
  const handlerAddImage = async ({ target }) => {
    setValues({
      ...values,
      images: [...values.images, imageURL],
    });
    setImagePreviews([...imagePreviews, imageURL]);
    setImageURL("");
    const fieldError = await validateField("images", imageURL);
    setErrors(fieldError);
  };

  const handlerImageChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleChange = async (event) => {
    const { name, value, files } = event.target;
    const fieldError = await validateField(name, value);
    setErrors(fieldError);
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

      case "carousel":
        setCarouselData(!carouselData);
        break;

      case "imageUrl":
        setImageURL(value);
        break;

      case "categoryName":
        setNewCategory("");
        setValues((prevValues) => ({
          ...prevValues,
          categoryName: [value],
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
        setNewBrand("");
        setValues((prevValues) => ({
          ...prevValues,
          brandName: value,
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
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    }
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
    if (Object.keys(errors).length !== 0) {
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

      // Muestra una alerta de que la creación está en proceso
      Swal.fire({
        icon: "info",
        allowOutsideClick: false,
        title: "Por favor espere mientras procesamos la información",
        showConfirmButton: false,
      });

      const response = fetchAddProduct(obj, dispatch, authData.jwt);

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
        carousel: carouselData,
        banner: "",
      });
      setBrand("Selecciona una marca");
      setCategoryName("Selecciona una categoria");
      setImagePreviews([]);
      setImageURL("");
      setCarouselData(false);
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
      {errors.e0 && (
        <Typography color="error" sx={{ fontSize: "large" }}>
          {errors.e0}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <TextField
              name="name"
              label="Nombre del producto"
              value={values.name}
              onChange={handleChange}
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
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
              sx={{ mt: 1, mb: 1 }}
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
              sx={{ mt: 1, mb: 1 }}
              variant="outlined"
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
              sx={{ mt: 1, mb: 1 }}
              variant="outlined"
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
              sx={{ mt: 1, mb: 1 }}
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
              MenuProps={{
                style: {
                  maxHeight: "200px",
                },
              }}
              value={isOtherBrand ? "otra" : values.brandName}
              onChange={handleChange}
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              fullWidth
            >
              <MenuItem value="Selecciona una marca">
                Selecciona una marca
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
            {errors.e5 ? (
              <Typography variant="caption" color="error">
                {errors.e5}
              </Typography>
            ) : (
              errors.e13 && (
                <Typography variant="caption" color="error">
                  {errors.e13}
                </Typography>
              )
            )}

            {isOtherBrand && (
              <TextField
                name="newBrand"
                label="Nueva Marca"
                sx={{ mt: 1, mb: 1 }}
                value={newBrand}
                onChange={handleChange}
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
              MenuProps={{
                style: {
                  maxHeight: "200px",
                },
              }}
              value={isOtherCategory ? "otra" : values.categoryName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              error={Boolean(errors.e6)}
            >
              <MenuItem value="Selecciona una categoria">
                Selecciona una categoria
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value="otra">Otra</MenuItem>
            </Select>
            {errors.e6 ? (
              <Typography color="error" variant="caption">
                {errors.e6}
              </Typography>
            ) : (
              errors.e12 && (
                <Typography variant="caption" color="error">
                  {errors.e12}
                </Typography>
              )
            )}
            {isOtherCategory && (
              <TextField
                name="newCategory"
                label="Nueva Categoria"
                value={newCategory}
                sx={{ mt: 1, mb: 1 }}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            )}
          </Box>
          <FormControlLabel
            name="carousel"
            value={carouselData}
            onChange={handleChange}
            control={<Checkbox />}
            label="Desea añadir el producto al carousel?"
          />
          {carouselData && (
            <Box>
              <TextField
                name="banner"
                label="Mensaje del Banner"
                value={values.banner}
                onChange={handleChange}
                variant="outlined"
                sx={{ mt: 1, mb: 1 }}
                fullWidth
                helperText={errors.e14 || errors.e15}
                error={Boolean(errors.e14) || Boolean(errors.e15)}
              />
            </Box>
          )}
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
                    mt: 1,
                    mb: 1,
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
                  sx={{ mt: 1, mb: 1 }}
                  variant="outlined"
                  onChange={handlerImageChange}
                  fullWidth
                />
                <Box
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#fd611a",
                    mt: 1,
                    mb: 1,
                  }}
                >
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
            ) : (
              errors.e11 && (
                <Typography variant="caption" color="error">
                  {errors.e11}
                </Typography>
              )
            )}
            <Box
              sx={{ borderRadius: 2, backgroundColor: "#fd611a", mt: 1, mb: 1 }}
            >
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{ color: "white" }}
                onClick={() => setIsUrlInput(!isUrlInput)}
              >
                {!isUrlInput
                  ? "Ingresar URL de imagen"
                  : "Cargar desde archivo"}
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
                {imagePreviews.length !== values.images.length && (
                  <Typography variant="caption" color="error">
                    Error: Alguna imagen no se ha renderizado correctamente.
                  </Typography>
                )}
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
                disabled={
                  !values.name ||
                  !values.price ||
                  !values.description ||
                  !values.warranty ||
                  !values.stock ||
                  !values.brandName ||
                  !values.categoryName ||
                  !values.images.length ||
                  errors.e1 ||
                  errors.e2 ||
                  errors.e3 ||
                  errors.e4 ||
                  errors.e5 ||
                  errors.e6 ||
                  errors.e7 ||
                  errors.e8 ||
                  errors.e9 ||
                  errors.e10 ||
                  errors.e11 ||
                  errors.e12 ||
                  errors.e13 ||
                  errors.e14 ||
                  errors.e15
                }
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
