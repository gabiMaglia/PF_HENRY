import SideBar from "../SideBar/SideBar.component";
import { Box } from "@mui/system";

const ProductServicesProfileComponent = () => {
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

export default ProductServicesProfileComponent;
