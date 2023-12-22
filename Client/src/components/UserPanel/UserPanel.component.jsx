import { Box, Hidden } from "@mui/material";
import SideBar from "../SideBar/SideBar.component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PATHROUTES from "../../helpers/pathRoute";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import UserProfile from "../UserProfile/UserProfile.component";
import ProductsServicesProfile from "../ProductsServicesProfile/ProductServicesProfile.component";
import WishListProfile from "../WishListProfile/WishListProfile.component";
import ShopingProfile from "../ShoppingProfile/ShoppingProfile.component";

import { getAuthDataCookie } from "../../utils/cookiesFunctions";

const UserPanelComponent = () => {
  const authData = getAuthDataCookie("authData");

  const userRole = authData.userRole;

  const userRoutes = [
    {
      path: PATHROUTES.USERPANEL + PATHROUTES.PROFILE,
      roles: ["customer", "admin"],
    },
    { path: PATHROUTES.USERPANEL + PATHROUTES.SHOPINGS, roles: ["customer"] },
    { path: PATHROUTES.USERPANEL + PATHROUTES.WISHLIST, roles: ["customer"] },
    {
      path: PATHROUTES.USERPANEL + PATHROUTES.PRODUCTS_SERVICES,
      roles: ["customer", "admin"],
    },
    { path: PATHROUTES.USERPANEL + PATHROUTES.TECHNICIANS, roles: ["admin"] },
    {
      path: PATHROUTES.USERPANEL + PATHROUTES.PRODUCT_CREATE,
      roles: ["admin"],
    },
  ];

  const actualLocation = useLocation().pathname;
  const navigate = useNavigate();

  const handleSliderClick = (action) => {
    const currentIndex = userRoutes.findIndex(
      (route) => route.path === actualLocation
    );
    const numRoutes = userRoutes.length;

    let nextIndex =
      action === "sig"
        ? (currentIndex + 1) % numRoutes
        : (currentIndex - 1 + numRoutes) % numRoutes;

    while (!userRoutes[nextIndex].roles.includes(userRole)) {
      nextIndex =
        action === "sig"
          ? (nextIndex + 1) % numRoutes
          : (nextIndex - 1 + numRoutes) % numRoutes;
    }

    const { path } = userRoutes[nextIndex];
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        mt: "1.2em",
      }}
    >
      <SideBar />
      <Box
        sx={{
          width: "15%",
          minHeight: "1vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Hidden mdDown>
          <ArrowBackIosIcon
            onClick={() => {
              handleSliderClick("ant");
            }}
            sx={{
              cursor: "pointer",
              color: "black",
            }}
          />
        </Hidden>
      </Box>
      <Routes>
        <Route
          path={userRole === "admin" ? PATHROUTES.PROFILE : PATHROUTES.PROFILE}
          element={<UserProfile />}
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.PRODUCTS_SERVICES
              : PATHROUTES.PRODUCTS_SERVICES
          }
          element={<ProductsServicesProfile />}
        />
        <Route
          path={
            userRole === "admin" ? PATHROUTES.TECHNICIANS : PATHROUTES.WISHLIST
          }
          element={<WishListProfile />}
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.PRODUCT_CREATE
              : PATHROUTES.SHOPINGS
          }
          element={<ShopingProfile />}
        />
      </Routes>

      <Box
        sx={{
          width: "15%",
          minHeight: "1vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Hidden mdDown>
          <ArrowForwardIosIcon
            onClick={() => {
              handleSliderClick("sig");
            }}
            name="sig"
            sx={{
              cursor: "pointer",
              color: "black",
            }}
          />
        </Hidden>
      </Box>
    </Box>
  );
};

export default UserPanelComponent;
