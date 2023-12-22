//HOOKS
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//MATERIAL UI
import {
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Logout,
  LocalShipping,
  Bookmark,
  HomeRepairService,
  Add,
  People,
  Menu,
  ArrowBack,
  History,
  Handyman,
} from "@mui/icons-material";
//UTILS
import {
  getAuthDataCookie,
  removeAuthDataCookie,
} from "../../utils/cookiesFunctions";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
import getFirstLetters from "../../helpers/getFirstLetters";
//REDUX
import { logoutUser } from "../../redux/slices/UserSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const { name, surname } = useSelector((state) => state.user);
  const authData = getAuthDataCookie("authData");
  const initialLetersUsers = {
    name: getFirstLetters(name),
    surname: getFirstLetters(surname),
  };

  const userRole = authData.userRole;

  const logout = () => {
    removeAuthDataCookie("authData");
    removeAuthDataCookie("jwt");
    dispatch(logoutUser());
  };

  const actualLocation = useLocation().pathname;

  let items = [];

  if (userRole === "customer") {
    items = [
      {
        name: "Mi cuenta",
        icon: (
          <Avatar
            sx={{ backgroundColor: "#fd611a", height: "40px", width: "40px" }}
          >
            <Typography
              variant="caption"
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
        path: PATHROUTES.USERPANEL + PATHROUTES.PRODUCTS_SERVICES,
      },
      {
        name: "Cerrar sesion",
        icon: <Logout />,
        action: "logout",
        path: PATHROUTES.HOME,
      },
    ];
  } else if (userRole === "admin") {
    items = [
      {
        name: "Mi cuenta",
        icon: (
          <Avatar
            sx={{ backgroundColor: "#fd611a", height: "40px", width: "40px" }}
          >
            <Typography
              variant="caption"
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
        name: "Crear producto",
        icon: <Add />,
        path: PATHROUTES.USERPANEL + PATHROUTES.PRODUCT_CREATE,
      },
      {
        name: "Técnicos",
        icon: <People />,
        path: PATHROUTES.USERPANEL + PATHROUTES.TECHNICIANS,
      },
      {
        name: "Productos en servicio",
        icon: <HomeRepairService />,
        path: PATHROUTES.USERPANEL + PATHROUTES.PRODUCTS_SERVICES,
      },
      {
        name: "Cerrar sesion",
        icon: <Logout />,
        action: "logout",
        path: PATHROUTES.HOME,
      },
    ];
  } else if (userRole === "technician") {
    items = [
      {
        name: "Mi cuenta",
        icon: (
          <Avatar
            sx={{ backgroundColor: "#fd611a", height: "40px", width: "40px" }}
          >
            <Typography
              variant="caption"
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
        name: "Productos en servicio",
        icon: <HomeRepairService />,
        path: PATHROUTES.USERPANEL + PATHROUTES.PRODUCTS_SERVICES,
      },
      {
        name: "Prodcutos reparados",
        icon: <Handyman />,
        path: PATHROUTES.USERPANEL + PATHROUTES.REAPIRED_PRODCUTS,
      },
      {
        name: "Historial reparaciones",
        icon: <History />,
        path: PATHROUTES.USERPANEL + PATHROUTES.REPAIR_HISTORY,
      },
      {
        name: "Cerrar sesion",
        icon: <Logout />,
        action: "logout",
        path: PATHROUTES.HOME,
      },
    ];
  }

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
      <ListItemButton sx={{ height: "3em" }} onClick={handleMenuClick}>
        {sideBarIsOpen ? <ArrowBack /> : <Menu sx={{ width: "100%" }} />}
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
