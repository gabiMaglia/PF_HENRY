//HOOKS
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
//COMPONENTS
import NavBar from "./components/NavBar/NavBar.component";
import Footer from "./components/Footer/Footer.component";
import WhatsApp from "./components/WhatsApp/WhatsApp.component";
import ButtonScrollTop from "./components/ButtonScrollTop/ButtonScrollTop.component";
import ProtectedRoutes from "./components/utils/ProtectedRoutes/ProtectedRoutes.component";
import CookiesPopup from "./components/CookiesPopup/CookiesPopup.component";
import LoginModal from "./components/LoginModal/LoginModal.component";
//PUBLICS VIEWS
import Home from "./views/publics/Home/Home.view";
import Products from "./views/publics/Products/Products.view";
import Support from "./views/publics/Support/Support.view";
import Questions from "./views/publics/Questions/Questions.view";
import Detail from "./views/publics/Detail/Detail.view";
import Categories from "./views/publics/Categories/Categories.view";
import Review from "./views/publics/Reviews/Reviews.view";
import Error404 from "./views/publics/Error404/Error404.view";
//PRIVATES VIEWS
import UserPanel from "./views/privates/UserPanel/UserPanel.view";
import ShoppingCart from "./views/privates/ShoppingCart/ShoppingCart.view";
//HELPERS
import PATHROUTES from "./helpers/pathRoute";
import useCheckAuthData from "./Hook/useCheckAuthData";
import { useEffect } from "react";
import ChangePasword from "./views/publics/ChangePassword/ChangePasword.view";
// Mat
const App = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // CustomHook que hace el check de token
  const checkAuthData = useCheckAuthData(openLoginModal);

  useEffect(() => {
    checkAuthData.checkToken();
  }, [checkAuthData]);

  return (
    <>
      <CookiesPopup />
        <NavBar />
      <Routes>
        <Route path={PATHROUTES.HOME} element={<Home />} />
        <Route path={PATHROUTES.PRODUCTS} element={<Products />} />
        <Route path={PATHROUTES.SUPPORT} element={<Support />} />
        <Route path={PATHROUTES.QUESTIONS} element={<Questions />} />
        <Route path={PATHROUTES.CATEGORIES} element={<Categories />} />
        <Route path={PATHROUTES.DETAIL} element={<Detail />} />
        <Route path={PATHROUTES.REVIEW} element={<Review />} />
        <Route path={PATHROUTES.CHANGEPASS} element={<ChangePasword />} />

        <Route element={<ProtectedRoutes allowedRoles={"customer"} />}>
          <Route path={PATHROUTES.SHOPCART} element={<ShoppingCart />} />
          <Route path={PATHROUTES.ERROR_404} element={<Error404 />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route
            path={`${PATHROUTES.ADMIN_USER_PANEL}/*`}
            element={<UserPanel />}
          ></Route>
          <Route path={PATHROUTES.ERROR_404} element={<Error404 />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["customer"]} />}>
          <Route
            path={`${PATHROUTES.CUSTOMER_USER_PANEL}/*`}
            element={<UserPanel />}
          ></Route>
          <Route path={PATHROUTES.ERROR_404} element={<Error404 />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["technician"]} />}>
          <Route
            path={`${PATHROUTES.TECHNICIAN_USER_PANEL}/*`}
            element={<UserPanel />}
          ></Route>
          <Route path={PATHROUTES.ERROR_404} element={<Error404 />} />
        </Route>
        <Route path={PATHROUTES.ERROR_404} element={<Error404 />} />
      </Routes>
      <LoginModal
        isOpen={isLoginModalOpen}
        setLoginModalIsOpen={setIsLoginModalOpen}
      />
      <WhatsApp />
      <ButtonScrollTop />
      <Footer />
    </>
  );
};

export default App;
