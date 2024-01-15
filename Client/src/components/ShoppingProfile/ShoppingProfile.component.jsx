//MATERIAL UI
import { Box, Typography, Divider, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserPanelProductCard from "../UserPanelProductCard/UserPanelProductCard.component";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import PATHROUTES from "../../helpers/pathRoute";
import {
  fetchCartUser,
  fetchProductCartGet,
} from "../../services/productServices";
//FIREBASE
import { completePurchaseEvent } from "../../services/firebaseAnayticsServices";
import DetailProductShopping from "../DetailProductShopping/DetailProductShopping.component";
import { addItem } from "../../redux/slices/cartSlice";

const ShoppingProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartUser } = useSelector((state) => state.cart);
  const cookiesAccepted = useSelector((state) => state.cookies);
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartUser(cookiesAccepted));
    dispatch(fetchProductCartGet(cookiesAccepted));
    dispatch(addItem());
  }, [dispatch]);

  const handleClickShop = async (id) => {
    navigate(`/product/${id}`);
  };

  const handleClick = (cartDate) => {
    setOpenDetail(!openDetail);
    setDetail(cartDate);
  };

  const buttons = [
    { text: "Volver a comprar", action: handleClickShop, color: "#fd611a" },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get("success");
    if (param) {
      window.localStorage.setItem("storedProducts", JSON.stringify([]));
      Swal.fire({
        icon: "success",
        title: "Gracias por elegir HyperMegaRed",
        text: "¡Esperamos que disfrutes de tu nuevo producto!",
        confirmButtonColor: "#fd611a",
        confirmButtonText: "Ir a inicio",
        cancelButtonText: "Quedarse en mis compras",
        cancelButtonColor: "green",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(PATHROUTES.HOME);
          window.scrollTo(0, 0);
        }
      });
      completePurchaseEvent("purchase"); // Evento de compra exitosa Firebase
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        mt: "1.2em",
        mb: "2em",
        position: "relative",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {cartUser.length === 0 ? (
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
          <Typography variant="h5">No existen compras registradas</Typography>
          <Link to={PATHROUTES.PRODUCTS}>
            <Button
              style={{
                backgroundColor: "#fd611a",
                color: "white",
              }}
            >
              Ir a comprar
            </Button>
          </Link>
        </Box>
      ) : openDetail ? (
        <Box
          sx={{
            zIndex: "10",
            width: "100%",
            height: "auto",
            mb: "5em",
            backgroundColor: "white",
            position: "absolute",
            border: "solid 1px",
            borderRadius: "25px",
          }}
        >
          <DetailProductShopping
            setOpenDetail={setOpenDetail}
            productsDetail={detail}
          />
        </Box>
      ) : (
        cartUser.map((cartDate) => {
          return (
            <Box
              key={cartDate.date}
              sx={{
                width: "100%",
                border: "1px solid black",
                borderRadius: "10px",
                mb: "1em",
                padding: "1em",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "space-between" },
                  mt: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: 14, lg: 18 },
                    ml: { xs: 0, lg: 2 },
                    mb: { xs: 1 },
                  }}
                >
                  {cartDate.date.split("T")[0]}
                </Typography>
                {cartDate.status && (
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: 14, lg: 18 },
                      mb: { xs: 1 },
                    }}
                  >
                    Estado: {cartDate.status}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  onClick={() => handleClick(cartDate)}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                  sx={{
                    width: { xs: "9.5em", lg: "11.5em" },
                    maxHeight: { xs: "2.5em", lg: "3.5em" },
                    mr: { xs: 0, lg: 2 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: ".8em",
                      textAlign: "center",
                      textTransform: "uppercase",
                      justifyContent: "center",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                    variant="body2"
                  >
                    Detalle de compra
                  </Typography>
                </Button>
              </Box>
              {cartDate.products.map((card, index) => {
                return (
                  <Box
                    key={card.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UserPanelProductCard
                      product={card}
                      buttons={buttons}
                      handleCardClick={handleClickShop}
                      actionParam={card.id}
                    />
                    {index + 1 !== cartDate.products.length && (
                      <Divider
                        sx={{
                          width: "90%",
                          height: "1px",
                          alignSelf: "center",
                          backgroundColor: "black",
                        }}
                      />
                    )}
                  </Box>
                );
              })}
              {cartDate.cartTotal && (
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    ml: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  total: {cartDate.cartTotal}
                </Typography>
              )}
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default ShoppingProfileComponent;
