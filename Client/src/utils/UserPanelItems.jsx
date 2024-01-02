//HOOKS
import { useSelector } from "react-redux";
//MATERIAL UI
import { Avatar, Typography } from "@mui/material";
import {
  LocalShipping,
  Bookmark,
  HomeRepairService,
  Add,
  People,
  Logout,
  FormatListNumbered
} from "@mui/icons-material";
//HELPERS
import PATHROUTES from "../helpers/pathRoute";
import getFirstLetters from "../helpers/getFirstLetters";

import { getDataFromSelectedPersistanceMethod } from "./authMethodSpliter";

const UserPanelItems = (name, surname) => {
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

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
        path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.PROFILE,
      },
      {
        name: "Mis compras",
        icon: <LocalShipping />,
        path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.SHOPINGS,
      },
      {
        name: "Lista de deseos",
        icon: <Bookmark />,
        path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.WISHLIST,
      },
      {
        name: "Productos en servicio",
        icon: <HomeRepairService />,
        path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.PRODUCTS_SERVICES,
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
        path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PROFILE,
      },
      {
        name: "Crear producto",
        icon: <Add />,
        path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PRODUCT_CREATE,
      },
      {
        name: "Lista de usuarios",
        icon: <People />,
        path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.USERS_LIST,
      },
      {
        name: "Lista de productos",
        icon: <FormatListNumbered />,
        path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PRODUCTS_LIST,
      },
      {
        name: "Crear servicio",
        icon: <Add />,
        path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.CREATE_SERVICES,
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
        path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.PROFILE,
      },
      {
        name: "Productos en servicio",
        icon: <HomeRepairService />,
        path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.PRODUCTS_SERVICES,
      },
      {
        name: "Crear servicio",
        icon: <Add />,
        path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.CREATE_SERVICES,
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

export default UserPanelItems;
