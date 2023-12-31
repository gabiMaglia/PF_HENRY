//HOOKS
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//MATERIAL UI
import {
  Typography,
  Box,
  Divider,
  Container,
  Button,
  useMediaQuery,
  styled,
  CardMedia,
  CircularProgress,
} from "@mui/material";
//COMPONENTS
import CarouselProducts from "../CarouselProducts/CarouselProducts.component";
//SERVICES
import {
  fetchProductById,
  fetchAllProducts,
  fetchProduct,
} from "../../services/productServices";
import { useLocalStorage } from "../../Hook/useLocalStorage";
//REDUX
import { resetState } from "../../redux/slices/productSlice";
import { addItem } from "../../redux/slices/cartSlice";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
//SWEET ALERT
import Swal from "sweetalert2";


// Estilo personalizado para el botón
const CustomButton = styled(Button)({
  backgroundColor: "#fd611a",
  color: "white",
  "&:hover": {
    backgroundColor: "#cc4c14",
  },
});
// Estilo personalizado para el componente CardMedia que muestra la imagen del producto
const ProductMedia = styled(CardMedia)({
  padding: 0,
  height: 200,
  width: 200,
  objectFit: "cover",
  margin: 0,
});
// Estilo personalizado para el contenedor de las miniaturas de imágenes
const ThumbnailContainer = styled(Container)({
  width: "80px",
  height: "80px",
  margin: "4px",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    border: "1px solid #fd611a",
    boxShadow: "2px 2px 2px #888888",
    borderRadius: "4px",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
// Componente para gestionar la transición de fundido
const FadeInTransition = ({ children }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1);
    }, 300);

    return () => {
      clearTimeout(fadeInTimeout);
    };
  }, [children]);

  return (
    <div
      style={{
        opacity: opacity,
        transition: "opacity 0.5s ease-in",
      }}
    >
      {children}
    </div>
  );
};

// Componente principal del detalle del producto
const Detail = () => {
  // Obtención del parámetro de la URL
  const { id } = useParams();

  // Configuración de Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productById, isLoading } = useSelector((state) => state.product);
  const [storedProducts, setStoredProducts] = useLocalStorage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const { allProducts } = useSelector((state) => state.product);
  const { login } = useSelector((state) => state.user);
  const [fadeInKey, setFadeInKey] = useState(0);
  const { cookiesAccepted } = useSelector((state) => state.cookies);

  const formatPrice = (price) => {
    return "$" + price.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  };

  // Función para resetear la animación de fundido
  const resetFadeIn = () => {
    setFadeInKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    resetFadeIn();
  }, [id, productById]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    // Función asíncrona para cargar los datos del producto
    const fetchDataAsync = async () => {
      dispatch(resetState());

      try {
        if (id && id !== productById?.id) {
          setIsLoadingDetail(true);
          const startTime = Date.now();
          await dispatch(fetchProductById(id));
          const minimumLoadingTime = 2000;
          const remainingTime = Math.max(
            0,
            minimumLoadingTime - (Date.now() - startTime)
          );
          setTimeout(() => {
            setIsLoadingDetail(false);
          }, remainingTime);
        }
      } catch (error) {
        console.error("Error in fetchDataAsync:", error);
        setIsLoadingDetail(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [dispatch, id, productById]);

  useEffect(() => {
    // Función para establecer la imagen inicial
    const setInitialImage = () => {
      if (
        productById &&
        productById.ProductImages &&
        productById.ProductImages.length > 0
      ) {
        setSelectedImage(productById.ProductImages[0].address);
      }
    };
    setInitialImage();
  }, [productById]);

  // Función para manejar la acción de agregar al carrito
  const handleAddToCart = () => {
    if (login === false) {
      Swal.fire({
        icon: "info",
        title: "Acceso Privado",
        text: "Debes estar logueado para agregar productos al carrito.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    } else {
      setStoredProducts(productById);
      dispatch(addItem());
      dispatch(fetchProduct(productById, cookiesAccepted));
      Swal.fire({
        icon: "success",
        title: "Producto agregado exitosamente",
        text: "El producto ha sido agregado al carrito.",
        confirmButtonColor: "#fd611a",
        confirmButtonText: "Ir al carrito",
        cancelButtonText: "Seguir comprando",
        cancelButtonColor: "green",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(PATHROUTES.SHOPCART);
          window.scrollTo(0, 0);
        }
      });
    }
  };

  // Verificación del tamaño de pantalla
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  // Renderizado condicional según el estado de carga y existencia de datos
  if (isLoadingDetail || loading || isLoading || !productById) {
    return (
      <FadeInTransition key={fadeInKey}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "space-around",
            justifyContent: "center",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <CircularProgress
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: 5,
              color: "#fd611a",
            }}
          />
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Cargando...
          </Typography>
        </Container>
      </FadeInTransition>
    );
  }

  // Renderizado del componente cuando los datos están disponibles
  return (
    <FadeInTransition key={fadeInKey}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 5,
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            boxShadow: "5px 5px 5px #888888",
            borderRadius: "8px",
            overflow: "hidden",
            margin: isSmallScreen ? "auto" : 0,
            maxWidth: isSmallScreen ? "100%" : 900,
          }}
        >
          {isLargeScreen &&
            productById.ProductImages &&
            productById.ProductImages.length > 1 && (
              <Container
                sx={{
                  width: "100px",
                  flexDirection: "column",
                  spacing: 1,
                }}
              >
                {productById.ProductImages.map((image, index) => (
                  <ThumbnailContainer
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => setSelectedImage(image.address)}
                  >
                    <img
                      src={image.address}
                      alt={productById.name}
                      style={{ width: "80px", border: "1px solid transparent" }}
                    />
                  </ThumbnailContainer>
                ))}
              </Container>
            )}

          <Container
            sx={{
              width: isSmallScreen ? "100%" : "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedImage && (
              <ProductMedia
                component="img"
                alt={productById.name}
                src={selectedImage}
                sx={{ height: "200px", maxWidth: "100%" }}
              />
            )}
          </Container>

          <Container
            sx={{
              padding: isLargeScreen ? "0 8px" : "8px",
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            <Box>
              <Typography
                fontSize={isSmallScreen ? 24 : isLargeScreen ? 24 : 21}
                fontWeight="bold"
                paddingTop={isLargeScreen ? 4 : 2}
              >
                {productById.name}
              </Typography>
              <Typography
                fontSize={isSmallScreen ? 24 : isLargeScreen ? 24 : 21}
                color="#fd611a"
                fontWeight="bold"
                paddingTop={isLargeScreen ? 4 : 2}
              >
                Precio: {formatPrice(productById.price)}
              </Typography>
            </Box>

            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 5,
                marginTop: 2,
              }}
            >
              <CustomButton
                variant="contained"
                size={isLargeScreen ? "large" : "small"}
                onClick={handleAddToCart}
              >
                Agregar al Carrito
              </CustomButton>
            </Container>
          </Container>
        </Container>
        <Container sx={{ marginTop: 2 }}>
          <Divider sx={{ marginY: 2 }} />
          <Typography fontSize={18} fontWeight={"bold"}>
            Descripción:
          </Typography>
          <Typography>{productById.description}</Typography>
        </Container>
        <Container>
          <Divider sx={{ marginY: 2 }} />
        </Container>
        <CarouselProducts allProducts={allProducts} />
      </Container>
    </FadeInTransition>
  );
};

export default Detail;
