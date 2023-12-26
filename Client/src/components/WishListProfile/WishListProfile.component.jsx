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
import { Link } from "react-router-dom";
import UserProfileProductCard from "../UserProfileProductCard/UserProfileProductCard.component";
import { useEffect, useState } from "react";
import PATHROUTES from "../../helpers/pathRoute";
import { useSelector, useDispatch } from "react-redux";
import { getAuthDataCookie } from "../../utils/cookiesFunctions";
import {
  fetchWishList,
  fetchAddItemWish,
} from "../../services/wishListServices";

const buttons = [{ text: "Agregar al carrito", action: "", color: "#fd611a" }];

const WhishListProfileComponent = () => {
  const dividerStyle = {
    width: "100%",
    height: "1px",
    alignSelf: "center",
    backgroundColor: "black",
  };

  const dispatch = useDispatch();

  const authData = getAuthDataCookie("authData");
  const userId = authData ? authData.userId : null;

  const wishListCards = useSelector((state) => state.wishlist.products);

  const chargeWishListProduct = () => {
    fetchWishList(userId, dispatch);
  };

  const [cardStatus, setCardStatus] = useState(
    wishListCards.map((card) => {
      return { id: card.id, status: false };
    })
  );

  const [isLoading, setIsLoading] = useState(true);

  const resetSelection = () => {
    const reset = wishListCards.map((card) => {
      return { id: card.id, status: false };
    });
    setCardStatus(reset);
  };

  useEffect(() => {
    chargeWishListProduct();
  }, []);

  useEffect(() => {
    resetSelection();
    if (wishListCards[0] && wishListCards[0].ProductImages) {
      setIsLoading(false);
    } else {
      chargeWishListProduct();
    }
  }, [wishListCards && wishListCards[0] && wishListCards[0].ProductImages]);

  const deleteProduct = (id) => {
    fetchAddItemWish(dispatch, userId, id);
  };

  const handleClickDeleteButton = () => {
    setIsLoading(true);
    cardStatus.forEach((card) => {
      if (card.status) {
        deleteProduct(card.id);
      }
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let newCardStatus = [...cardStatus];
    if (name === "all") {
      newCardStatus = newCardStatus.map((card) => {
        return { id: card.id, status: checked };
      });
    } else {
      newCardStatus[name].status = checked;
    }
    setCardStatus(newCardStatus);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "500px",
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
      )}
    </Box>
  );
};

export default WhishListProfileComponent;
