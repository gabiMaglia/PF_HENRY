//HOOKS
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
//MATERIAL UI
import { Box, Hidden } from "@mui/material";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";
//COMPONENTS
import SideBar from "../SideBar/SideBar.component";
import UserProfile from "../UserProfile/UserProfile.component";
import ShopingProfile from "../ShoppingProfile/ShoppingProfile.component";
import WishListProfile from "../WishListProfile/WishListProfile.component";
import AnalyticsInfo from "../AnalyticsInfo/AnalyticsInfo.component";
import ProductCreateProfile from "../ProductCreateProfile/ProductCreateProfile.component";
import ProductsServicesProfile from "../ProductsServicesProfile/ProductServicesProfile.component";
import CreateService from "../CreateService/CreateService.component";
import UsersTable from "../UsersTable/UsersTable.component";
import ProductsTable from "../ProductsTable/ProductsTable.component";
import ServicesTable from "../ServicesTable/ServicesTable.component";
import { GoogleOAuthProvider } from "@react-oauth/google";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import { useTheme } from "@mui/system";

const UserPanelComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const actualLocation = useLocation().pathname;
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);

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
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PRODUCTS_LIST,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.PRODUCT_CREATE,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.SERVICE_LIST,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.SERVICE_CREATE,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.USERS_LIST,
      roles: ["admin"],
    },
    {
      path: PATHROUTES.ADMIN_USER_PANEL + PATHROUTES.ANALYTICS_INFO,
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
      path: PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.SERVICE_CREATE,
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
        height: "97vh",
        minHeight: "500px",
        width: "100%",
        mt: "1.2em",
        [theme.breakpoints.down("sm")]: {
          mt: ".5em",
        },
        [theme.breakpoints.down("xs")]: {
          mb: "8em",
        },
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
              ? PATHROUTES.PRODUCTS_LIST
              : userRole === "customer"
              ? PATHROUTES.SHOPINGS
              : PATHROUTES.PRODUCTS_SERVICES
          }
          element={
            userRole === "admin" ? (
              <ProductsTable />
            ) : userRole === "customer" ? (
              <ShopingProfile />
            ) : (
              <ProductsServicesProfile />
            )
          }
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.PRODUCT_CREATE
              : userRole === "customer"
              ? PATHROUTES.WISHLIST
              : userRole === "technician"
              ? PATHROUTES.SERVICE_CREATE
              : PATHROUTES.PROFILE
          }
          element={
            userRole === "admin" ? (
              <ProductCreateProfile />
            ) : userRole === "customer" ? (
              <WishListProfile />
            ) : userRole === "technician" ? (
              <CreateService />
            ) : (
              <UserProfile />
            )
          }
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.SERVICE_LIST
              : userRole === "customer"
              ? PATHROUTES.PRODUCTS_SERVICES
              : PATHROUTES.PROFILE
          }
          element={
            userRole === "admin" ? (
              <ServicesTable />
            ) : userRole === "customer" ? (
              <ProductsServicesProfile />
            ) : (
              <UserProfile />
            )
          }
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.SERVICE_CREATE
              : PATHROUTES.PROFILE
          }
          element={
            userRole === "admin" ? (
              <CreateService />
            ) : userRole === "customer" ? (
              <ProductsServicesProfile />
            ) : (
              <UserProfile />
            )
          }
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.SERVICE_CREATE
              : PATHROUTES.PROFILE
          }
          element={userRole === "admin" ? <CreateService /> : <UserProfile />}
        />
        <Route
          path={
            userRole === "admin" ? PATHROUTES.USERS_LIST : PATHROUTES.PROFILE
          }
          element={userRole === "admin" ? <UsersTable /> : <UserProfile />}
        />
        <Route
          path={
            userRole === "admin" ? PATHROUTES.USERS_LIST : PATHROUTES.PROFILE
          }
          element={userRole === "admin" ? <UsersTable /> : <UserProfile />}
        />
        <Route
          path={
            userRole === "admin"
              ? PATHROUTES.ANALYTICS_INFO
              : PATHROUTES.PROFILE
          }
          element={
            userRole === "admin" ? (
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_REPORTING_ANALYTICS_CLIENT_ID}
              >
                <AnalyticsInfo />
              </GoogleOAuthProvider>
            ) : (
              <UserProfile />
            )
          }
        />
      </Routes>
      <Box
        sx={{
          width: "15%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          [theme.breakpoints.down("sm")]: {
            width: "5em",
          },
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
