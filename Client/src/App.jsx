//HOOKS
import { Routes, Route } from "react-router-dom";
//COMPONENTS
import SearchBar from "./components/SearchBar/SearchBar.component";
import NavBar from "./components/NavBar/NavBar.component";
import Footer from "./components/Footer/Footer.component";
import WhatsApp from "./components/WhatsApp/WhatsApp.component";
import ButtonScrollTop from "./components/ButtonScrollTop/ButtonScrollTop.component";
import ProtectedRoutes from "./components/utils/ProtectedRoutes/ProtectedRoutes.component";
//PUBLICS VIEWS
import Home from "./views/publics/Home/Home.view";
import Products from "./views/publics/Products/Products.view";
import Support from "./views/publics/Support/Support.view";
import Questions from "./views/publics/Questions/Questions.view";
import Detail from "./views/publics/Detail/Detail.view";
import Categories from "./views/publics/Categories/Categories.view";
//PRIVATES VIEWS
import UserProfile from "./views/privates/UserProfile/UserProfile.view";
import ShoppingProfile from "./views/privates/ShoppingProfile/ShoppingProfile.view";
import WishListProfile from "./views/privates/WishListProfile/WishListProfile.view";
import ProductServicesProfile from "./views/privates/ProductServices/ProductServices.view";
import ShoppingCart from "./views/privates/ShoppingCart/ShoppingCart.view";
//MATREIAL UI
import { Box } from "@mui/material";
//DB
import PRODUCTS from "./dataBase/bdd.json";
//HELPERS
import PATHROUTES from "./helpers/pathRoute";

const App = () => {
  return (
    <>
      <Box>
        <SearchBar />
        <NavBar />
        <Routes>
          <Route path={PATHROUTES.HOME} element={<Home />} />
          <Route path={PATHROUTES.PRODUCTS} element={<Products />} />
          <Route path={PATHROUTES.SUPPORT} element={<Support />} />
          <Route path={PATHROUTES.QUESTIONS} element={<Questions />} />
          <Route path={PATHROUTES.CATEGORIES} element={<Categories />} />
          <Route
            path={PATHROUTES.DETAIL}
            element={<Detail products={PRODUCTS} />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path={PATHROUTES.PROFILE} element={<UserProfile />} />
            <Route path={PATHROUTES.SHOPINGS} element={<ShoppingProfile />} />
            <Route path={PATHROUTES.WISHLIST} element={<WishListProfile />} />
            <Route path={PATHROUTES.PRODUCTSERVICES} element={<ProductServicesProfile />} />
            <Route path={PATHROUTES.SHOPCART} element={<ShoppingCart />} />
          </Route>
        </Routes>
        <WhatsApp />
        <ButtonScrollTop />
        <Footer />
      </Box>
    </>
  );
};

export default App;
