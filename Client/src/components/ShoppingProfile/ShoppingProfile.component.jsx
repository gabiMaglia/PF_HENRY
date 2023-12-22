// import SideBar from "../SideBar/SideBar.component";
import { Box, Hidden } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import PATHROUTES from "../../helpers/pathRoute";
// import { Link } from "react-router-dom";
import EcommerceCard from "../EcommerceCard/EcommerceCard.component";

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
      <EcommerceCard />
    </Box>
  );
};

export default ShoppingProfileComponent;
