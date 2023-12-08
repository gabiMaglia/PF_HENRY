import { Routes, Route } from "react-router-dom";

import SearchBar from "./views/SearchBar/SearchBar.view";
import NavBar from "./views/NavBar/NavBar.view";
import Home from "./views/Home/Home.view";
import Products from "./views/Products/Products.view";
import Support from "./views/Support/Support.view";
import Questions from "./views/Questions/Questions.view";
import Footer from "./views/Footer/Footer.views";
import Carousel from "./components/Carousel/Carousel.component";

import PATHROUTES from "./helpers/pathRoute";

function App() {
  return (
    <>
      <div>
        <SearchBar />
        <NavBar />
        <Carousel />
        <Routes>
          <Route path={PATHROUTES.HOME} element={<Home />} />
          <Route path={PATHROUTES.PRODUCTS} element={<Products />} />
          <Route path={PATHROUTES.SUPPORT} element={<Support />} />
          <Route path={PATHROUTES.QUESTIONS} element={<Questions />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
