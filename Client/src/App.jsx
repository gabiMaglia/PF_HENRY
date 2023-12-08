import { Routes, Route } from "react-router-dom";
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
//DB
import PRODUCTS from "./dataBase/bdd.json";
//HELPERS
import PATHROUTES from "./helpers/pathRoute";

function App() {
  return (
    <>
      <div>
        <SearchBar />
        <NavBar />
        <Routes>
          <Route path={PATHROUTES.HOME} element={<Home />} />
          <Route path={PATHROUTES.PRODUCTS} element={<Products />} />
          <Route path={PATHROUTES.SUPPORT} element={<Support />} />
          <Route path={PATHROUTES.QUESTIONS} element={<Questions />} />
          <Route path={PATHROUTES.DETAIL} element={<Detail products={PRODUCTS} />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
