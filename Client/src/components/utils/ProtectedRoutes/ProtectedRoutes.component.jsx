import { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PATHROUTES from "../../../helpers/pathRoute";

const ProtectedRoutesComponent = ({ element }) => {
  const userData = useSelector((state) => state.user);
  const isLoggedIn = userData.login;
  const navigate = useNavigate();

  console.log("Datos del usuario:", userData);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATHROUTES.HOME, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Route element={element} /> : null;
};

export default ProtectedRoutesComponent;
