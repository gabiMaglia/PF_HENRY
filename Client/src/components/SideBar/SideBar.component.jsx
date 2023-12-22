import { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Logout,
  LocalShipping,
  Bookmark,
  HomeRepairService,
} from "@mui/icons-material";
import PATHROUTES from "../../helpers/pathRoute";
import { removeAuthDataCookie } from "../../utils/cookiesFunctions";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getFirstLetters from "../../helpers/getFirstLetters";
import { logoutUser } from "../../redux/slices/UserSlice";

const SideBar = () => {
  const dispatch = useDispatch();

  const { name, surname } = useSelector((state) => state.user);
  const initialLetersUsers = {
    name: getFirstLetters(name),
    surname: getFirstLetters(surname),
  };

  const logout = () => {
    removeAuthDataCookie("authData");
    removeAuthDataCookie("jwt");
    dispatch(logoutUser());
  };

  const actualLocation = useLocation().pathname;

  const items = [
    {
      name: "Mi cuenta",
      icon: (
        <Avatar
          sx={{ backgroundColor: "#fd611a", height: "40px", width: "40px" }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            {initialLetersUsers.name + initialLetersUsers.surname}
          </Typography>
        </Avatar>
      ),
      path: PATHROUTES.USERPANEL + PATHROUTES.PROFILE,
    },
    {
      name: "Mis compras",
      icon: <LocalShipping />,
      path: PATHROUTES.USERPANEL + PATHROUTES.SHOPINGS,
    },
    {
      name: "Lista de deseos",
      icon: <Bookmark />,
      path: PATHROUTES.USERPANEL + PATHROUTES.WISHLIST,
    },
    {
      name: "Productos en servicio",
      icon: <HomeRepairService />,
      path: PATHROUTES.USERPANEL + PATHROUTES.PRODUCTSERVICES,
    },
    {
      name: "Cerrar sesion",
      icon: <Logout />,
      action: "logout",
      path: PATHROUTES.HOME,
    },
  ];

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const sideBarBoxStyle = sideBarIsOpen
    ? {
        minWidth: "10em",
        maxWidth: "18em",
        width: "25%",
        minHeight: "100%",
        borderRight: ".1px solid grey",
      }
    : {
        minWidth: "5em",
        maxWidth: "8em",
        width: "5%",
        minHeight: "100%",
        borderRight: ".1px solid grey",
      };

  const handleMenuClick = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  return (
    <Box sx={sideBarBoxStyle}>
      <ListItemButton
        sx={{ height: "3em" }}
        onClick={handleMenuClick}
      >
        {sideBarIsOpen ? (
          <ArrowBackIcon />
        ) : (
          <MenuIcon sx={{ width: "100%" }} />
        )}
      </ListItemButton>
      <Divider />
      <List sx={{ pt: "0px" }}>
        {items.map((item) => (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={item.path}
            key={item.name}
          >
            <ListItemButton
              sx={{
                backgroundColor: actualLocation === item.path ? "#fd611a" : "",
                height: "5em",
                pt: "1em",
                pb: "1em",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                if (item.action === "logout") {
                  logout();
                }
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {sideBarIsOpen ? <ListItemText primary={item.name} /> : null}
              <Divider />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
