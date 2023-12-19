import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; 

const ProtectedRoutesComponent = ({ redirectPath = "/" }) => {
  const isAuthenticated = useSelector((state) => state.user.login);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutesComponent;
