//MATERIAL UI
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
//HOOKS
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../Hook/useLocalStorage";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import {
  fetchWishList,
  fetchAddItemWish,
} from "../../services/wishListServices";
import { addItem } from "../../redux/slices/cartSlice";
import { fetchProduct } from "../../services/productServices";
import PATHROUTES from "../../helpers/pathRoute";
//COMPONENTS
import UserPanelProductCard from "../UserPanelProductCard/UserPanelProductCard.component";
import Loading from "../Loading/Loading.component";
// SweetAlert
import Swal from "sweetalert2";

const WhishListProfileComponent = () => {
  const dividerStyle = {
    width: "100%",
    height: "1px",
    alignSelf: "center",
    backgroundColor: "black",
  };
  const [storedProducts, setStoredProducts] = useLocalStorage();
  const [isLoading, setIsLoading] = useState(true); //Estado de carga
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  const { cookiesAccepted } = useSelector((state) => state.cookies);
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const userId = authData ? authData.userId : null; //Información del usuario
  const wishListCards = useSelector((state) => state.wishlist.products); //Estado global Wishlist

  const formatPrice = (price) => {
    return "$" + price.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  };

  const chargeWishListProduct = () => {
    fetchWishList(userId, dispatch); //Recarga de el estado global Wishlist
  };

  const handleCardClick = (id) => {
    const path = PATHROUTES.DETAIL.replace(":id", id); // Redireccionamient al detail
    navigate(path);
  };

  const handleAddToCart = async (none, productId, product) => {
    if (login === false) {
      Swal.fire({
        icon: "info",
        title: "Acceso Privado",
        text: "Debes estar logueado para agregar productos al carrito.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    } else {
      setStoredProducts(product);
      dispatch(addItem());
      dispatch(fetchProduct(product, cookiesAccepted));
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

  const [cardStatus, setCardStatus] = useState(
    wishListCards.map((card) => {
      return { id: card.id, status: false }; //Estado de productos seleccionados
    })
  );

  const resetSelection = () => {
    const reset = wishListCards.map((card) => {
      return { id: card.id, status: false }; // Recarga del estado de seleccionados
    });
    setCardStatus(reset);
  };

  useEffect(() => {
    setIsLoading(true);
    chargeWishListProduct(); //Recarga del estado global Wishlist al iniciar el componente
  }, []);

  useEffect(() => {
    resetSelection();
    if (wishListCards[0] && wishListCards[0].ProductImages) {
      setIsLoading(false);
    } else {
      chargeWishListProduct(); //Sino recarga el estado global
    }
  }, [wishListCards && wishListCards[0] && wishListCards[0].ProductImages]);

  useEffect(() => {
    wishListCards?.length === 0 && setIsLoading(false);
  }, [wishListCards]);

  const deleteProduct = (id) => {
    setIsLoading(true);
    fetchAddItemWish(dispatch, userId, id); // ELiminar un producto
  };

  const handleClickDeleteButton = () => {
    cardStatus.forEach((card) => {
      //Recorrer el estado de productos seleccionados
      if (card.status) {
        deleteProduct(card.id); // Eliminar los seleccionados
      }
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let newCardStatus = [...cardStatus];
    if (name === "all") {
      newCardStatus = newCardStatus.map((card) => {
        return { id: card.id, status: checked }; //Manejo del estado de seleccionados
      });
    } else {
      newCardStatus[name].status = checked;
    }
    setCardStatus(newCardStatus);
  };

  const buttons = [
    {
      text: "Agregar al carrito",
      action: handleAddToCart, // Botones que renderiza la card
      color: "#fd611a",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        mt: "1.2em",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {wishListCards.length === 0 && !isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2em",
            textAlign: "center",
          }}
        >
          <Typography variant="h5">
            Aun no tienes equipos agregados a tu lista de deseados
          </Typography>
          <Link to={PATHROUTES.PRODUCTS}>
            <Button
              style={{
                backgroundColor: "#fd611a",
                color: "white",
              }}
            >
              Explorar equipos
            </Button>
          </Link>
        </Box>
      ) : (
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Box
            sx={{
              width: "100%",
              zIndex: "5",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              pb: "1em",
              pr: ".5em",
              position: "absolute",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
              <FormControlLabel
                sx={{ ml: "0em" }}
                control={<Checkbox onChange={handleChange} name={"all"} />}
                label="Seleccionar todos"
              />
            </Box>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#fd611a",
                color: "white",
              }}
              onClick={handleClickDeleteButton}
            >
              Eliminar selección
            </Button>
          </Box>
          <Box sx={{ mt: "4em" }}>
            {wishListCards.map((card, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Divider sx={dividerStyle} />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      height: "100%",
                      pt: "1em",
                      pb: "1em",
                    }}
                  >
                    {cardStatus?.length > 0 && (
                      <Checkbox
                        name={`${index}`}
                        checked={cardStatus[index]?.status}
                        onChange={handleChange}
                      />
                    )}
                    <Box sx={{ flexGrow: "1" }}>
                      <UserPanelProductCard
                        setIsLoading={setIsLoading}
                        handleCardClick={handleCardClick}
                        actionParam={card}
                        product={{
                          id: card.id,
                          name: card.name,
                          image: card.ProductImages
                            ? card.ProductImages[0].address
                            : "",
                          budget: `${formatPrice(card.price)}`,
                        }}
                        buttons={buttons}
                      />
                    </Box>
                  </Box>
                  {index + 1 === wishListCards.length && (
                    <Divider sx={dividerStyle} />
                  )}
                </Box>
              );
            })}
          </Box>
          {isLoading && <Loading />}
        </Box>
      )}
    </Box>
  );
};

export default WhishListProfileComponent;
