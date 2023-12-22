import { Box } from "@mui/material";
import { getAuthDataCookie } from "../../utils/cookiesFunctions";

const ProductServicesProfileComponent = () => {
  const authData = getAuthDataCookie("authData");

  const userRole = authData.userRole;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          mt: "1.2em",
        }}
      >
        {userRole === "admin" ? (
          <p>Contenido del PRODUCTS SERVICES (admin)</p>
        ) : (
          <p>Contenido del PRODUCT SERVICES (customer)</p>
        )}
      </Box>
    </>
  );
};

export default ProductServicesProfileComponent;
