import { Navigate, Outlet } from "react-router-dom";
import { getAuthDataCookie } from "../../../utils/cookiesFunctions";
import { SessionAlertLogin, SessionAlertRole } from "../SessionAlert/SessionAlert.component";

const ProtectedRoutesComponent = ({ redirectPath = "/", allowedRoles= [] }) => {
  const authData = getAuthDataCookie("authData");

  if (!authData || !authData.login) {
    SessionAlertLogin();
    return <Navigate to={redirectPath} replace />;
  }

  const userRole = authData.userRole;

  if (!allowedRoles.includes(userRole)) {
    SessionAlertRole();
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutesComponent;

