import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDataFromSelectedPersistanceMethod } from '../utils/authMethodSpliter';
import { checkSessionStatus } from '../services/authServices';

const useCheckAuthData = () => {
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  
  useEffect(() => {
    const checkTokenData = async ({ jwt }) => {
      try {
        const {response} = await checkSessionStatus(jwt);
        console.log(response);
      } catch (error) {
        console.error('Error al verificar el estado de la sesión:', error);
      }
    };

    checkTokenData(authData);
  }, [authData]);

  return authData;
};

export default useCheckAuthData;
