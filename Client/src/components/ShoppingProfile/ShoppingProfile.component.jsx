import SideBar from "../SideBar/SideBar.component";
import { Box, Hidden } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PATHROUTES from "../../helpers/pathRoute";
import { Link } from "react-router-dom";

const ShoppingProfileComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        mt: "1.2em",
      }}
    >
      Contenido del shoping profile
    </Box>
  );
};

export default ShoppingProfileComponent;
