import React, { useEffect } from "react";
import HomeProducts from "../HomeProducts/HomeProducts.component";
import CarouselBottomComponent from "../../components/CarouselBottom/CarouselBottom.component";
import CarouselTopComponent from "../../components/CarouselTop/CarouselTop.component";
import data from "../../dataBase/bdd.json";
import { useDispatch, useSelector } from "react-redux";
import { fechAllProducts } from "../../redux/slices/ProducSlice";

const HomeComponent = () => {
  // const { products } = data;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fechAllProducts());
  }, []);

  return (
    <>
      <div>
        <CarouselTopComponent />
        <HomeProducts products={products} />
        <CarouselBottomComponent />
      </div>
    </>
  );
};

export default HomeComponent;
