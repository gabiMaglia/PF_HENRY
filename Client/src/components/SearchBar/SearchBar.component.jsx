//HOOKS
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../Hook/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//MATERIAL UI
import { Input, Typography, Box, Button, styled } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
//COMPONENTS
import LoginModal from "../LoginModal/LoginModal.component";
import RegisterModal from "../RegisterModal/RegisterModal.component";
//REDUX
import { fetchSearch, fetchChage } from "../../services/ProductServices";
import { getUserById } from "../../services/UserServices";
//UTILS
import {
  getAuthDataCookie,
  removeAuthDataCookie,
} from "../../utils/cookiesFunctions";
//HELPERS
import PATHROUTES from '../../helpers/pathRoute'
//IMAGES - ICONS
import img from "/icons/logo.jpeg";
import carrito from "/icons/carrito-de-compras.png";

const Img = styled("img")({
  width: 140,
  height: 140,
});

const Logo = styled("img")({
  width: 30,
  height: 30,
  position: "relative",
});

export default function SearchAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [input, setInput] = useState("");
  const { inputName } = useSelector((state) => state.product);

  const [user, setUser] = useState({ name: "", surname: "" });

  const getUserInfo = async (token) => {
    if (token !== undefined) {
      const { userId } = token;
      if (userId !== undefined) {
        const response = await getUserById(userId);
        const { name, surname } = response;
        setUser({ name: name, surname: surname });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(PATHROUTES.PRODUCTS);
    dispatch(fetchSearch(inputName));
  };

  // Estado del carrito manejado por useLocalStorage
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  const [cartItemCount, setCartItemCount] = useState(0);

  const handleChange = (event) => {
    dispatch(fetchChage(event.target.value));
  };

  const handleCartButtonClick = () => {
    // Aquí puedes realizar la acción deseada al hacer clic en el carrito
    // Por ejemplo, mostrar un modal del carrito
    setLoginModalIsOpen(true);
  };

  useEffect(() => {
    const userToken = getAuthDataCookie();
    getUserInfo(userToken);
  }, []);

  const renderLoginOrLogoutButton = () => {
    const token = getAuthDataCookie();

    return (
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
        {token === null || token === undefined ? (
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
        ) : (
          <Button
            startIcon={<AccountBoxIcon />}
            color="inherit"
            sx={{
              color: "white",
            }}
            onClick={() => {
              removeAuthDataCookie();
              window.location.reload();
            }}
          >
            CERRAR SESIÓN
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
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
        <Img src={img} alt="Logotipo" onClick={()=>{
          navigate(PATHROUTES.HOME)
        }}/>
        {cartItemCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 5px",
            }}
          >
            {cartItemCount}
          </span>
        )}
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
        <Box>
          <Logo src={carrito} />
        </Box>
        <Typography sx={{ ml: "2em", maxWidth: "8em", textAlign: "center" }}>
          {user.name} <br /> {user.surname}
        </Typography>
        {renderLoginOrLogoutButton()}
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
