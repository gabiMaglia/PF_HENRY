//HOOKS
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
//SESISON ALERT
import {
  SessionAlertLogin,
  SessionAlertRole,
} from "../SessionAlert/SessionAlert.component";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../../utils/authMethodSpliter";
import { useEffect, useState } from "react";

const ProtectedRoutesComponent = ({
  redirectPath = "/",
  allowedRoles = [],
}) => {
  const [login, setLogin] = useState("Cargando");
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  useEffect(() => {
    if (authData && authData.login) {
      const { userRole } = authData;
      if (allowedRoles.includes(userRole)) {
        setLogin("enabled");
      } else {
        setLogin("noRole");
      }
    } else {
      setLogin("noSession");
    }
  }, [authData]);

  switch (login) {
    case "Cargando":
      return <div>Cargando...</div>;
    case "noSession":
      SessionAlertLogin();
      return <Navigate to={redirectPath} replace />;
    case "noRole":
      SessionAlertRole();
      return <Navigate to={redirectPath} replace />;
    case "enabled":
      return <Outlet />;

    default:
      break;
  }
};

export default ProtectedRoutesComponent;
