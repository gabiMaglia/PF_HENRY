//HOOKS
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//COMPONENTS
import HomeProducts from "../HomeProducts/HomeProducts.component";
import CarouselBottom from "../../components/CarouselBottom/CarouselBottom.component";
import CarouselTop from "../../components/CarouselTop/CarouselTop.component";
import GoogleMap from "../../components/GoogleMap/GoogleMap.component";
//REDUX
import { fetchAllProducts } from "../../services/productServices";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div>
        <CarouselTop />
        <HomeProducts allProducts={allProducts} />
        <GoogleMap />
        <CarouselBottom />
      </div>
    </>
  );
};

export default HomeComponent;
