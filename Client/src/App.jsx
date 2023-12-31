//HOOKS
import { Routes, Route } from "react-router-dom";
//COMPONENTS
import SearchBar from "./components/SearchBar/SearchBar.component";
import NavBar from "./components/NavBar/NavBar.component";
import Footer from "./components/Footer/Footer.component";
import WhatsApp from "./components/WhatsApp/WhatsApp.component";
import ButtonScrollTop from "./components/ButtonScrollTop/ButtonScrollTop.component";
import ProtectedRoutes from "./components/utils/ProtectedRoutes/ProtectedRoutes.component";
import CookiesPopup from "./components/CookiesPopup/CookiesPopup.component";
//PUBLICS VIEWS
import Home from "./views/publics/Home/Home.view";
import Products from "./views/publics/Products/Products.view";
import Support from "./views/publics/Support/Support.view";
import Questions from "./views/publics/Questions/Questions.view";
import Detail from "./views/publics/Detail/Detail.view";
import Categories from "./views/publics/Categories/Categories.view";
import Review from "./views/publics/Review/Review.view";
//PRIVATES VIEWS
import UserPanel from "./views/privates/UserPanel/UserPanel.view";
import ShoppingCart from "./views/privates/ShoppingCart/ShoppingCart.view";
//HELPERS
import PATHROUTES from "./helpers/pathRoute";

const App = () => {
  return (
    <>
      <CookiesPopup />

      <SearchBar />
      <NavBar />
      <Routes>
        <Route path={PATHROUTES.HOME} element={<Home />} />
        <Route path={PATHROUTES.PRODUCTS} element={<Products />} />
        <Route path={PATHROUTES.SUPPORT} element={<Support />} />
        <Route path={PATHROUTES.QUESTIONS} element={<Questions />} />
        <Route path={PATHROUTES.CATEGORIES} element={<Categories />} />
        <Route path={PATHROUTES.DETAIL} element={<Detail />} />
        <Route element={<ProtectedRoutes allowedRoles={"customer"} />}>
          <Route path={PATHROUTES.SHOPCART} element={<ShoppingCart />} />
          <Route path={PATHROUTES.REVIEW} element={<Review />} />
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route
            path={`${PATHROUTES.ADMIN_USER_PANEL}/*`}
            element={<UserPanel />}
          ></Route>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["customer"]} />}>
          <Route
            path={`${PATHROUTES.CUSTOMER_USER_PANEL}/*`}
            element={<UserPanel />}
          ></Route>
        </Route>

        <Route element={<ProtectedRoutes allowedRoles={["technician"]} />}>
          <Route
            path={`${PATHROUTES.TECHNICIAN_USER_PANEL}/*`}
            element={<UserPanel />}
          ></Route>
        </Route>
      </Routes>
      <WhatsApp />
      <ButtonScrollTop />
      <Footer />
    </>
  );
};

export default App;
