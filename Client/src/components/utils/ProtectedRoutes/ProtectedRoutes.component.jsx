import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; 
import SessionAlert from "../SessionAlert/SessionAlert.component";

const ProtectedRoutesComponent = ({ redirectPath = "/" }) => {
  const isAuthenticated = useSelector((state) => state.user.login);

  if (!isAuthenticated) {
    SessionAlert();
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutesComponent;
