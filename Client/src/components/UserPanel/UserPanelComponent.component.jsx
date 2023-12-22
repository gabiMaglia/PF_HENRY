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

const UserPanelComponent = () => {
  const userRoutes = [
    PATHROUTES.USERPANEL + PATHROUTES.PROFILE,
    PATHROUTES.USERPANEL + PATHROUTES.SHOPINGS,
    PATHROUTES.USERPANEL + PATHROUTES.WISHLIST,
    PATHROUTES.USERPANEL + PATHROUTES.PRODUCTSERVICES,
  ];

  const actualLocation = useLocation().pathname;
  const navigate = useNavigate();

  const handleSliderClick = (action) => {
    let redirectTo = "";
    if (action === "sig") {
      redirectTo = userRoutes[userRoutes.indexOf(actualLocation) + 1];
      redirectTo === undefined && (redirectTo = userRoutes[0]);
    } else {
      redirectTo = userRoutes[userRoutes.indexOf(actualLocation) - 1];
      redirectTo === undefined &&
        (redirectTo = userRoutes[userRoutes.length - 1]);
    }
    navigate(redirectTo);
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
          path={PATHROUTES.PROFILE}
          element={<UserProfile />}
        />
        <Route
          path={PATHROUTES.PRODUCTSERVICES}
          element={<ProductsServicesProfile />}
        />
        <Route
          path={PATHROUTES.WISHLIST}
          element={<WishListProfile />}
        />
        <Route
          path={PATHROUTES.SHOPINGS}
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
