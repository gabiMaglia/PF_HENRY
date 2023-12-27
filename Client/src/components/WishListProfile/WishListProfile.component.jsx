//MATERIAL UI
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Container,
  CircularProgress,
  Typography,
} from "@mui/material";
//HOOKS
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../Hook/useLocalStorage";
import { useNavigate } from "react-router-dom";
//UTILS
import {
  fetchWishList,
  fetchAddItemWish,
} from "../../services/wishListServices";
import { getAuthDataCookie } from "../../utils/cookiesFunctions";
import { addItem } from "../../redux/slices/cartSlice";
import PATHROUTES from "../../helpers/pathRoute";
//COMPONENTS
import UserProfileProductCard from "../UserProfileProductCard/UserProfileProductCard.component";

const WhishListProfileComponent = () => {
  const dividerStyle = {
    width: "100%",
    height: "1px",
    alignSelf: "center",
    backgroundColor: "black",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [storedProducts, setStoredProducts] = useLocalStorage(); //Productos del carrito

  const authData = getAuthDataCookie("authData");
  const userId = authData ? authData.userId : null; //Información del usuario

  const wishListCards = useSelector((state) => state.wishlist.products); //Estado global Wishlist

  const chargeWishListProduct = () => {
    fetchWishList(userId, dispatch); //Recarga de el estado global Wishlist
  };

  const handleCardClick = (id) => {
    const path = PATHROUTES.DETAIL.replace(":id", id); // Redireccionamient al detail
    navigate(path);
  };

  const handleAddToCart = (product) => {
    setStoredProducts(product); // Agregar producto al carrito
    dispatch(addItem());
  };

  const [cardStatus, setCardStatus] = useState(
    wishListCards.map((card) => {
      return { id: card.id, status: false }; //Estado de productos seleccionados
    })
  );

  const [isLoading, setIsLoading] = useState(true); //Estado de carga

  const resetSelection = () => {
    const reset = wishListCards.map((card) => {
      return { id: card.id, status: false }; // Recarga del estado de seleccionados
    });
    setCardStatus(reset);
  };

  useEffect(() => {
    chargeWishListProduct(); //Recarga del estado global Wishlist al iniciar el componente
  }, []);

  useEffect(() => {
    resetSelection();
    if (wishListCards[0] && wishListCards[0].ProductImages) {
      //Si ya cargo las imagenes
      setIsLoading(false); //Deja de cargar
    } else {
      chargeWishListProduct(); //Sino recarga el estado global
    }
  }, [wishListCards && wishListCards[0] && wishListCards[0].ProductImages]);

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
      {wishListCards.length === 0 ? (
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
      ) : !isLoading ? (
        <>
          <Box
            sx={{
              width: "75%",
              zIndex: "10",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              pb: "1em",
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
              sx={{ mr: "3.5em" }}
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
                    <Checkbox
                      name={`${index}`}
                      checked={cardStatus[index].status}
                      onChange={handleChange}
                    />
                    <Box sx={{ flexGrow: "1" }}>
                      <UserProfileProductCard
                        handleCardClick={handleCardClick}
                        actionParam={card}
                        product={{
                          id: card.id,
                          name: card.name,
                          image: card.ProductImages
                            ? card.ProductImages[0].address
                            : "",
                          budget: `$${card.price}`,
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
        </>
      ) : (
        <Container
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignContent: "space-around",
            justifyContent: "center",
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
      )}
    </Box>
  );
};

export default WhishListProfileComponent;
