//HOOKS
import { Routes, Route } from "react-router-dom";
//COMPONENTS
import SearchBar from "./components/SearchBar/SearchBar.component";
import NavBar from "./components/NavBar/NavBar.component";
import Footer from "./components/Footer/Footer.component";
import WhatsAppComponent from "./components/WhatsApp/WhatsApp.component";
import ButtonScrollTopComponent from "./components/ButtonScrollTop/ButtonScrollTop.component";
//VIEWS
import Home from "./views/Home/Home.view";
import Products from "./views/Products/Products.view";
import Support from "./views/Support/Support.view";
import Questions from "./views/Questions/Questions.view";
import Detail from "./views/Detail/Detail.view";
import ShoppingCartView from "./views/ShoppingCart/ShoppingCart.view";
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
          <Route path={PATHROUTES.SHOPCART} element={<ShoppingCartView />} />
          <Route
            path={PATHROUTES.DETAIL}
            element={<Detail products={PRODUCTS} />}
          />
        </Routes>
        <WhatsAppComponent />
        <ButtonScrollTopComponent />
        <Footer />
      </Box>
    </>
  );
};

export default App;
