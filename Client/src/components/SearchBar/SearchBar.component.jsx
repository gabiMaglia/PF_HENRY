import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import img from "/icons/logo.jpeg";
import { Input } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Button from "@mui/material/Button";
import { useLocalStorage } from "../../Hook/useLocalStorage";
import carrito from "/icons/carrito-de-compras.png";
import LoginModal from "../LoginModal/LoginModal.component";
import { fechSearch } from "../../redux/slices/ProducSlice";
import { useDispatch } from "react-redux";
import RegisterModal from "../RegisterModal/RegisterModal.component";

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
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fechSearch(input));
    setInput("");
  };

  // Estado del carrito manejado por useLocalStorage
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const [cartItemCount, setCartItemCount] = useState(0);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleCartButtonClick = () => {
    // Aquí puedes realizar la acción deseada al hacer clic en el carrito
    // Por ejemplo, mostrar un modal del carrito
    setLoginModalIsOpen(true);
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
        onClick={handleCartButtonClick}
      >
        <Img
          src={img}
          alt="Logotipo"
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
              padding: "2px 5px",
            }}
          >
            {cartItemCount}
          </span>
        )}
      </Box>
      <form onSubmit={handleSubmit}>
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
            value={input}
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
            onClick={handleCartButtonClick}
            sx={{
              height: 40,
              textAlign: "center",
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
      </form>
      <Box sx={{ display: "flex", flexDirection: "row", mt: { xs: 2 } }}>
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
        <Box>
          <Logo src={carrito} />
        </Box>
      </Box>
      <LoginModal
        isOpen={loginModalIsOpen}
        closeModal={() => setLoginModalIsOpen(false)}
      />
      <RegisterModal />
    </Box>
  );
}
