//HOOKS
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
//MATERIAL UI
import { Box, Hidden } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
//COMPONENTS
import SideBar from "../SideBar/SideBar.component";
import UserProfile from "../UserProfile/UserProfile.component";
import ShopingProfile from "../ShoppingProfile/ShoppingProfile.component";
import WishListProfile from "../WishListProfile/WishListProfile.component";
import TechniciansProfile from "../TechniciansProfile/TechniciansProfile.component";
import ProductCreateProfile from "../ProductCreateProfile/ProductCreateProfile.component";
import ProductsServicesProfile from "../ProductsServicesProfile/ProductServicesProfile.component";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import { useSelector } from "react-redux";

const UserPanelComponent = () => {
  const navigate = useNavigate();
  const actualLocation = useLocation().pathname;
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted)

  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const userRole = authData.userRole;
  


  const userRoutes = [
    //CUSTOMERS
    {
      path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.PROFILE,
      roles: ["customer"],
    },
    {
      path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.SHOPINGS,
      roles: ["customer"],
    },
    {
      path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.WISHLIST,
      roles: ["customer"],
    },
    {
      path: PATHROUTES.CUSTOMER_USER_PANEL + PATHROUTES.PRODUCTS_SERVICES,
      roles: ["customer"],
    },
    //ADMINS
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PROFILE,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PRODUCT_CREATE,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.TECHNICIANS,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PRODUCTS_SERVICES,
      roles: ["admin"],
    },
    //TECHNICIANS
    {
      path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.PROFILE,
      roles: ["technician"],
    },
    {
      path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.PRODUCTS_SERVICES,
      roles: ["technician"],
    },
    {
      path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.REAPIRED_PRODCUTS,
      roles: ["technician"],
    },
    {
      path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.REPAIR_HISTORY,
      roles: ["technician"],
    },
  ];

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
          <ArrowBackIos
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
              ? PATHROUTES.PRODUCT_CREATE
              : PATHROUTES.SHOPINGS
          }
          element={
            userRole === "admin" ? <ProductCreateProfile /> : <ShopingProfile />
          }
        />
        <Route
          path={
            userRole === "admin" ? PATHROUTES.TECHNICIANS : PATHROUTES.WISHLIST
          }
          element={
            userRole === "admin" ? <TechniciansProfile /> : <WishListProfile />
          }
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.PRODUCTS_SERVICES
              : PATHROUTES.PRODUCTS_SERVICES
          }
          element={<ProductsServicesProfile />}
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
          <ArrowForwardIos
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