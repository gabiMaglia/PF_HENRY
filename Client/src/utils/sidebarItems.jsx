import { Avatar, Typography } from "@mui/material";
import {
  LocalShipping,
  Bookmark,
  HomeRepairService,
  Add,
  People,
  Logout,
  History,
  Handyman,
} from "@mui/icons-material";
import PATHROUTES from "../helpers/pathRoute";
import getFirstLetters from "../helpers/getFirstLetters";
import { getAuthDataCookie } from "./cookiesFunctions";

const sideBarItems = (name, surname) => {
  const authData = getAuthDataCookie("authData");

  const userRole = authData.userRole;

  const initialLetersUsers = {
    name: getFirstLetters(name),
    surname: getFirstLetters(surname),
  };

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
  return items;
};

export default sideBarItems;
