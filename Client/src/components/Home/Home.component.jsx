//HOOKS
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//COMPONENTS
import HomeProducts from "../HomeProducts/HomeProducts.component";
import CarouselBottomComponent from "../../components/CarouselBottom/CarouselBottom.component";
import CarouselTopComponent from "../../components/CarouselTop/CarouselTop.component";
import WhatsAppComponent from "../WhatsApp/WhatsApp.component";
//REDUX
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
        <WhatsAppComponent />
      </div>
    </>
  );
};

export default HomeComponent;
