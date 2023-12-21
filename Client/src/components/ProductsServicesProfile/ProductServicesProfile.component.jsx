import SideBar from "../SideBar/SideBar.component";
import { Box, Hidden } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PATHROUTES from "../../helpers/pathRoute";
import { Link } from "react-router-dom";

const ProductServicesProfileComponent = () => {
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
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={PATHROUTES.WISHLIST}
          >
            <ArrowBackIosIcon
              sx={{
                cursor: "pointer",
                color: "black",
              }}
            />
          </Link>
        </Hidden>
      </Box>
      Contenido del product service
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
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={PATHROUTES.PROFILE}
          >
            <ArrowForwardIosIcon
              sx={{
                cursor: "pointer",
                color: "black",
              }}
            />
          </Link>
        </Hidden>
      </Box>
    </Box>
  );
};

export default ProductServicesProfileComponent;
