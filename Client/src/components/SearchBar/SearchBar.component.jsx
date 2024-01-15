//HOOKS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//MATERIAL UI
import { Input, Box, Button, styled, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Autocomplete } from "@mui/material";
//COMPONENTS
import LoginModal from "../LoginModal/LoginModal.component";
import RegisterModal from "../RegisterModal/RegisterModal.component";
import UserMenu from "../UserMenu/UserMenu.component";
import Notification from "../Notifications/Notifications.component";
//REDUX
import { logUser } from "../../redux/slices/userSlice";
import { addItem } from "../../redux/slices/cartSlice";
//SERVICES
import { fetchSearch, fetchChage } from "../../services/productServices";
import { getUserById } from "../../services/userServices";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
//IMAGES - ICONS
import img from "/icons/logo.svg";
//FIREBASE
import { userSearchEvent } from "../../services/firebaseAnayticsServices";
import { fetchHistoryUSer } from "../../services/historyUserService";
export default function SearchAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const { login } = useSelector((state) => state.user);
  const { historyUser } = useSelector((state) => state.historyUser);
  const { inputName } = useSelector((state) => state.product);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const userRole = authData ? authData.userRole : null;
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const prueba = historyUser && historyUser.map((history) => history.value);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dispatch(addItem());
    if (login) {
      fetchHistoryUSer(authData.userId, dispatch);
    }
  }, [login]);

  useEffect(() => {
    const newSuggestions = login
      ? prueba.length
        ? prueba
        : ["sin historial"]
      : ["sin historial, debe loguearse para tener historial"];
    setSuggestions(newSuggestions);
  }, [login]);

  const Img = styled("img")({
    width: 140,
    height: 140,
  });

  const getUserInfo = async (token) => {
    if (token !== undefined) {
      const response = await getUserById(token.userId, authData.jwt);
      dispatch(logUser({ userObject: { ...response, rolId: token.userRole } }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchSearch(inputName)(dispatch);
    userSearchEvent(inputName);
    navigate(PATHROUTES.PRODUCTS);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleChange = (event) => {};

  const handleCartClick = () => {
    navigate(PATHROUTES.SHOPCART);
  };

  useEffect(() => {
    const userToken = getDataFromSelectedPersistanceMethod(cookieStatus);
    if (userToken?.login) {
      getUserInfo(userToken);
    }
  }, [cookieStatus]);

  const handleAutocomplete = (value) => {
    if (!value) {
      setAutocompleteSuggestions([]);
      setShowAutocomplete(false);
      return;
    }

    const matchingSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setAutocompleteSuggestions(matchingSuggestions);
    setShowAutocomplete(matchingSuggestions.length > 0);
  };

  const handleAutocompleteSelect = (selectedSuggestion) => {
    setInputValue(selectedSuggestion);
    dispatch(fetchChage(selectedSuggestion));
    setShowAutocomplete(false);
  };

  useEffect(() => {
    handleAutocomplete(inputName);
  }, [inputName]);

  return (
    <Box
      sx={{
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
          position: "relative",
        }}
      >
        <Input
          type="text"
          value={inputValue}
          placeholder=" Buscador"
          onChange={(e) => {
            dispatch(fetchChage(e.target.value));
            setInputValue(e.target.value);
            handleAutocomplete(e.target.value);
          }}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onKeyPress={handleKeyPress}
          sx={{
            width: { xs: 300, sm: 500, xl: 800 },
            fontSize: 20,
            color: "black",
            ml: 1,
          }}
          disableUnderline
        />
        {isInputFocused && showAutocomplete && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1,
              backgroundColor: "white",
              boxShadow: 3,
              borderRadius: 2,
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            {autocompleteSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onMouseDown={() => handleAutocompleteSelect(suggestion)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #ccc",
                }}
              >
                {suggestion}
              </div>
            ))}
          </Box>
        )}
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
          justifyContent: "space-around",
          gap: "3em",
          [`@media (max-width:1200px)`]: {
            width: "50%",
          },
        }}
      >
        {userRole === "customer" ? (
          <Box
            sx={{
              position: "relative",
              ml: "2em",
            }}
          >
            <ShoppingCartIcon
              /*src={carrito}*/ sx={{ fontSize: "32px" }}
              onClick={handleCartClick}
            />
            {cartItemCount > -1 && (
              <span
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  transform: "translate(50%, -50%)",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "0.2em 0.5em",
                  fontSize: "0.7em",
                }}
              >
                {cartItemCount}
              </span>
            )}
          </Box>
        ) : userRole === "admin" ? (
          <Box>
            <AdminPanelSettingsIcon
              sx={{ display: "flex", margin: "0 auto", fontSize: "32px" }}
            />{" "}
            <Typography sx={{ fontSize: "14px" }}>Admin</Typography>
          </Box>
        ) : userRole === "technician" ? (
          <Box>
            <ManageAccountsIcon
              sx={{ display: "flex", margin: "0 auto", fontSize: "32px" }}
            />{" "}
            <Typography sx={{ fontSize: "14px" }}>Técnico</Typography>
          </Box>
        ) : /*<ShoppingCartIcon sx={{ fontSize: "32px" }} onClick={handleCartClick} />*/
        null}
        {userRole === "customer" && login === true && (
          <Box>
            <Notification />
          </Box>
        )}
        {login === false ? (
          <Box
            sx={{
              flexGrow: 0,
              maxWidth: "xl",
              ml: "4em",
              borderRadius: 2,
              backgroundColor: "#fd611a",
              [`@media (max-width:1200px)`]: {
                ml: 0,
              },
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
          <Box>
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
      {/* <ConnectedProductBox cartItemCount={cartItemCount} */}
    </Box>
  );
}
