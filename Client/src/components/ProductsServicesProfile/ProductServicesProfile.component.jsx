//HOOKS
import { useSelector } from "react-redux";
//MATERIAL UI
import { Box } from "@mui/material";
//COMPONENTS
import ProdcuctsServicesCustomer from "../ProductsServicesCustomer/ProductsServicesCustomer.component";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";

const ProductServicesProfileComponent = () => {
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

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
