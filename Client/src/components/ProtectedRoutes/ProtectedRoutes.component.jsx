import { Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import PATHROUTES from "../../helpers/pathRoute"

const ProtectedRoutesComponent = ({ element, roleRequired }) => {
    const userData = useSelector((state) => state.user);
    const isLoggedIn = userData.login;
    const userRole = userData.role;

    console.log("Datos del usuario:", userData);
  
    if (!isLoggedIn || userRole !== roleRequired) {
      return <Navigate to={PATHROUTES.HOME} />;
    }
  
    return <Route element={element} />;
}

export default ProtectedRoutesComponent