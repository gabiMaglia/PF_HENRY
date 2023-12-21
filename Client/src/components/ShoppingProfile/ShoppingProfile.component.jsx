import SideBar from "../SideBar/SideBar.component";
import { Box } from "@mui/system";

const ShoppingProfileComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <SideBar />
    </Box>
  );
};

export default ShoppingProfileComponent;
