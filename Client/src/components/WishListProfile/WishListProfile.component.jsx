import SideBar from "../SideBar/SideBar.component";
import { Box } from "@mui/system";

const WhishListProfileComponent = () => {
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

export default WhishListProfileComponent;
