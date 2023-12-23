import { Box } from "@mui/material";
import ProdcuctsServicesCustomer from "../ProductsServicesCustomer/ProductsServicesCustomer.component";
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
          <p>Contenido de PRODUCTS SERVICVES (admin)</p>
        ) : (
          <ProdcuctsServicesCustomer />
        )}
      </Box>
    </>
  );
};

export default ProductServicesProfileComponent;
