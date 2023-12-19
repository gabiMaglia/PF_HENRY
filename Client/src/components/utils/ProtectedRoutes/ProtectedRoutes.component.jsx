import { useEffect } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PATHROUTES from "../../../helpers/pathRoute";

const ProtectedRoutesComponent = ({ canActivate, element }) => {
  // const userData = useSelector((state) => state.user);
  // const isLoggedIn = userData.login;
  const navigate = useNavigate();

  // console.log("Datos del usuario:", userData);

  useEffect(() => {
    if (!canActivate) {
      navigate(PATHROUTES.HOME, { replace: true });
    }
  }, [canActivate, navigate]);

  return canActivate ? (
    <Route element={element} />
  ) : (
    <Navigate to={PATHROUTES.HOME} />
  );
};

export default ProtectedRoutesComponent;
