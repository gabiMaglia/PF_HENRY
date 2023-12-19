//HOOKS

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
//MATERIAL UI
import { Input, Box, Button, styled } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
//COMPONENTS
import LoginModal from "../LoginModal/LoginModal.component";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import UserMenu from "../UserMenu/UserMenu.component";
//REDUX
import { fetchSearch, fetchChage } from "../../services/ProductServices";
import { getUserById } from "../../services/UserServices";
//UTILS
import { getAuthDataCookie } from "../../utils/cookiesFunctions";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
//IMAGES - ICONS
import img from "/icons/logo.svg";
import carrito from "/icons/carrito-de-compras.png";
import { logUser } from "../../redux/slices/userSlice";

export default function SearchAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItemCount, setCartItemCount] = useState(0);

  const Img = styled("img")({
    width: 140,
    height: 140,
  });
  const Logo = styled("img")({
    width: 30,
    height: 30,
    position: "relative",
    cursor: "pointer",
  });


  const { login } = useSelector((state) => state.user);
  const { inputName } = useSelector((state) => state.product);

  const getUserInfo = async (token) => {
    if (token !== undefined) {
      const response = await getUserById(token.userId);
      dispatch(logUser({ userObject: {...response, rolId : token.userRole } }));

    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(PATHROUTES.PRODUCTS);
    dispatch(fetchSearch(inputName));
  };

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  const handleChange = (event) => {
    dispatch(fetchChage(event.target.value));
  };

  const handleCartClick = () => {
    navigate(PATHROUTES.SHOPCART);
  };

  const handleAddToCart = () => {
    // Lógica para agregar productos al carrito
    // Actualizar el estado del contador del carrito de forma atómica
    setCartItemCount((prevCount) => prevCount + 1);
  };

  // const updateCartCount = () => {
     // Hacer algo aquí si es necesario
     // Puedes realizar alguna acción adicional después de actualizar el contador
  // };

  useEffect(() => {
    const userToken = getAuthDataCookie("authData");

    if (userToken) {
      getUserInfo(userToken);
    }
  }, []);

  return (
    <Box
      sx={{
        mt: 1,
        mb: 1,
        flexGrow: 1,
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Img
          src={img}
          alt="Logotipo"
          onClick={() => {
            navigate(PATHROUTES.HOME);
          }}
        />
      </Box>
      <Box
        sx={{
          mt: { xs: 2 },
          border: 2,
          borderRadius: 2,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          display: "flex",
          alignItems: "center",
          ml: 5,
          mr: 5,
        }}
      >
        <Input
          type="text"
          value={inputName}
          placeholder=" Buscador"
          onChange={handleChange}
          sx={{
            width: { xs: 300, sm: 500, xl: 800 },
            fontSize: 20,
            color: "black",
            ml: 1,
          }}
          disableUnderline
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          sx={{
            alignItems: "stretch",
            height: 40,
            backgroundColor: "black",
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            "&:hover": { backgroundColor: "#fd611a" },
          }}
        >
          <SearchIcon
            sx={{
              color: "white",
              "&:hover": { color: "black" },
            }}
          />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: { xs: 2 },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            ml: "2em",
          }}
        >
          {/* Icono del carrito con contador */}
          <Logo
            src={carrito}
            onClick={() => {
              handleAddToCart();
              handleCartClick();
            }}
          />

          {cartItemCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "0.2em 0.5em",
                fontSize: "0.8em",
              }}
            >
              {cartItemCount}
            </span>
          )}
        </Box>

        {login === false ? (
          <Box
            sx={{
              flexGrow: 0,
              maxWidth: "xl",
              ml: 4,
              mr: 4,
              borderRadius: 2,
              backgroundColor: "#fd611a",
            }}
          >
            <Button
              startIcon={<AccountBoxIcon />}
              color="inherit"
              sx={{
                color: "white",
              }}
              onClick={() => {
                setLoginModalIsOpen(true);
              }}
            >
              INICIAR SESIÓN
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 0,
              maxWidth: "xl",
              ml: 4,
              mr: 4,
            }}
          >
            <UserMenu />
          </Box>
        )}
      </Box>

      <LoginModal
        isOpen={loginModalIsOpen}
        setLoginModalIsOpen={setLoginModalIsOpen}
        setRegisterModalIsOpen={setRegisterModalIsOpen}
      />
      <RegisterModal
        isOpen={registerModalIsOpen}
        setRegisterModalIsOpen={setRegisterModalIsOpen}
      />
    </Box>
  );
}
