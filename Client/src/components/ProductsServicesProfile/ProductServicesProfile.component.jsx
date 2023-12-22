import { Box } from "@mui/material";
import { getAuthDataCookie } from "../../utils/cookiesFunctions";

const ProductServicesProfileComponent = () => {
  const authData = getAuthDataCookie("authData");

  const userRole = authData.userRole;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        mt: "1.2em",
      }}
    >
      {userRole === "admin" ? (
        <p>Contenido de PRODUCTS SERVICVES (admin)</p>
      ) : (
        <p>Contenido de PRODUCTS SERVICVES (customer)</p>
      )}
    </Box>
  );
};

export default ProductServicesProfileComponent;
