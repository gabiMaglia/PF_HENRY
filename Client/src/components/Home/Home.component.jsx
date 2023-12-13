import React, { useEffect } from "react";
import HomeProducts from "../HomeProducts/HomeProducts.component";
import CarouselBottomComponent from "../../components/CarouselBottom/CarouselBottom.component";
import CarouselTopComponent from "../../components/CarouselTop/CarouselTop.component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../services/ProductServices";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <>
      <div>
        <CarouselTopComponent />
        <HomeProducts allProducts={allProducts} />
        <CarouselBottomComponent />
      </div>
    </>
  );
};

export default HomeComponent;
