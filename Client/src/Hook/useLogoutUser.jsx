import { useDispatch } from "react-redux";
import { logOutUser } from "../services/authServices";
import {
  clearPersistanceData,
  getDataFromSelectedPersistanceMethod,
} from "../utils/authMethodSpliter";
import { logoutUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import PATHROUTES from "../helpers/pathRoute";
import { resetCart } from "../redux/slices/cartSlice";

const useLogoutUser = (cookieStatus) => {
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    clearPersistanceData(cookieStatus);
    await logOutUser(authData.jwt);
    dispatch(logoutUser());
    window.localStorage.setItem("storedProducts", JSON.stringify([]));
    navigate(PATHROUTES.HOME);
    dispatch(resetCart());
  };
  return {logout}
  
};

export default useLogoutUser;
