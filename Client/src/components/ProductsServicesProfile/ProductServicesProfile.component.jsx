import { Box } from "@mui/material";
import ServicesProductsCard from "../ServicesProductsCard/ServicesProductsCard.component";

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
        <ServicesProductsCard />
      )}
    </Box>
  );
};

export default ProductServicesProfileComponent;
