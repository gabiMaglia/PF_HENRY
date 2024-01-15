//HOOKS
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import { Box } from "@mui/material";
//COMPONENTS
import HomeProducts from "../HomeProducts/HomeProducts.component";
import CarouselBottom from "../../components/CarouselBottom/CarouselBottom.component";
import CarouselTop from "../../components/CarouselTop/CarouselTop.component";
import GoogleMap from "../../components/GoogleMap/GoogleMap.component";

//REDUX
// import { fetchAllProducts } from "../../services/productServices";

const HomeComponent = () => {
  // const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  // useEffect(() => {
    //   fetchAllProducts();
    // }, [dispatch]);


  return (
    <>
      <Box>
        <CarouselTop />
        <HomeProducts allProducts={allProducts} />
        <GoogleMap />
        <CarouselBottom />
      </Box>
    </>
  );
};

export default HomeComponent;
