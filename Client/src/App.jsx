//HOOKS
import { Routes, Route } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
//COMPONENTS
import SearchBar from "./components/SearchBar/SearchBar.component";
import NavBar from "./components/NavBar/NavBar.component";
import Footer from "./components/Footer/Footer.components";
//VIEWS
import Home from "./views/Home/Home.view";
import Products from "./views/Products/Products.view";
import Support from "./views/Support/Support.view";
import Questions from "./views/Questions/Questions.view";
import Detail from "./views/Detail/Detail.view";
//MATREIAL UI
import { Box } from "@mui/material";
//DB
import PRODUCTS from "./dataBase/bdd.json";
//HELPERS
import PATHROUTES from "./helpers/pathRoute";

const reCaptchaKey = import.meta.env.VITE_RECAPTCHA_V3;

const App = () => {
  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={reCaptchaKey}
        language="es"
      >
        <Box>
          <SearchBar />
          <NavBar />
          <Routes>
            <Route path={PATHROUTES.HOME} element={<Home />} />
            <Route path={PATHROUTES.PRODUCTS} element={<Products />} />
            <Route path={PATHROUTES.SUPPORT} element={<Support />} />
            <Route path={PATHROUTES.QUESTIONS} element={<Questions />} />
            <Route
              path={PATHROUTES.DETAIL}
              element={<Detail products={PRODUCTS} />}
            />
          </Routes>
          <Footer />
        </Box>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default App;
