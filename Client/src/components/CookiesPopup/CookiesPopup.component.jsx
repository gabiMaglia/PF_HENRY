//HOOKS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import { Box, Button, Link, Typography } from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";
//REDUX
import { cookieBoxEnable, acceptCookie, rejectCookies } from "../../redux/slices/cookiesSlice";

const CookiesPopup = () => {
  const dispatch = useDispatch();
  const showCookiesBox = useSelector((state) => state.cookies.boxEnable);

  useEffect(() => {
    const acceptance = window.localStorage.getItem('cookieAccepted')
    if (acceptance) {
      dispatch(acceptCookie(acceptance));
    }
    const showBox = window.localStorage.getItem('showCoookieBox')
    if (showBox) {
      dispatch(cookieBoxEnable(showBox));
    }
  }, []);

  const handleSubmit = (coockies, showBox) => {
    dispatch(acceptCookie(coockies));
    dispatch(cookieBoxEnable(showBox));
    !coockies ? rejectCookies() : null;
  };

  const buttonStyles = {
    border: "none",
    color: "#fff",
    width: "calc(100% / 2 -10px)",
    padding: "8px 8px",
    borderRadius: "4px",
    cursor: "pointer",
    background: "#FD611A",

    "&:hover": {
      background: "#973b107c",
    },
  };
  return (
    showCookiesBox === true && (
      <Box
        sx={{
          position: "fixed",
          bottom: "50px",
          left: "20px",
          maxWidth: "345px",
          width: "100%",

          background: "#FD611A",
          borderRadius: "8px",
          padding: "15px 25px 22px",
          zIndex: "99",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: "15px",
            paddingBlock: "1rem",
          }}
          component="header"
        >
          <CookieIcon
            sx={{
              color: "white",
              fontSize: "32px",
            }}
          />
          <Typography
            sx={{ fontWeight: 600, fontSize: "17px", color: "white" }}
            variant="h2"
          >
            Consentimiento de Cookies
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "16px", color: "white" }} variant="p">
            Este sitio web usa Cookies para mejorar la experiencia de usuario y
            funcionalidad del mismo. Si no las acepta su informacion de sesion se guardara en el almacenamiento local de su navegador quedando expuesta a diversos ataques
            <Link
              sx={{
                textDecoration: "none",
                color: "grey",
                "&:hover": {
                  color: "white",
                  textDecoration: "underline",
                },
              }}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Leer mas...{" "}
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "16px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={buttonStyles}
            onClick={() => {
              handleSubmit(true, false);
            }}
          >
            Aceptar
          </Button>
          <Button
            onClick={() => {
              handleSubmit(false, false);
            }}
            sx={buttonStyles}
          >
            Rechazar
          </Button>
        </Box>
      </Box>
    )
  );
};

export default CookiesPopup;
