//MATERIAL UI
import { Box, Typography, Divider, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserPanelProductCard from "../UserPanelProductCard/UserPanelProductCard.component";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCart } from "../../redux/slices/cartSlice";
import { useLocalStorage } from "../../Hook/useLocalStorage";

import sortCardByDate from "../../utils/sortCardsByDate";
import PATHROUTES from "../../helpers/pathRoute";
import {
  fetchCartUser,
  fetchProductCartPost,
} from "../../services/productServices";

const ShoppingProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartUser } = useSelector((state) => state.cart);
  const cookiesAccepted = useSelector((state) => state.cookies);
  const [storedProducts, setStoredProducts] = useLocalStorage();
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartUser(cookiesAccepted));
  }, [dispatch]);

  const handleClickShop = async (product) => {
    const productCart = {
      id: product.id,
      name: product.name,
      ProductImages: [{ address: product.image }],
      price: product.budget,
      ProductCategories: [{ name: product.ProductCategories[0].name }],
      ProductBrands: [{ name: product.ProductBrands[0].name }],
    };

    setStoredProducts(productCart);
    dispatch(addItem());
    dispatch(fetchProductCartPost(productCart, cookieStatus));
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
  };

  const handleClick = () => {
    Swal.fire({
      icon: "warning",
      iconColor: "#fd611a",
      title: "Funcionalidad en construcción",
      showCancelButton: true,
      confirmButtonColor: "#fd611a",
      confirmButtonText: "Ir a inicio",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(PATHROUTES.HOME);
      }
    });
  };

  const buttons = [
    { text: "Detalle compra", action: handleClick, color: "black" },
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
    }
  }, []);

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
                  flexDirection: "row",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    ml: 2,
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
                      fontSize: 18,
                      ml: 64,
                    }}
                  >
                    Estado: {cartDate.status}
                  </Typography>
                )}
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
                    <UserPanelProductCard product={card} buttons={buttons} />
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
