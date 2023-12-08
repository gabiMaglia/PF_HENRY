import React from "react";
import HomeProducts from "../HomeProducts/HomeProducts.component";
import CarouselBottomComponent from "../../components/CarouselBottom/CarouselBottom.component";
import CarouselTopComponent from "../../components/CarouselTop/CarouselTop.component";
import data from "../../dataBase/bdd.json";

const HomeComponent = () => {
  const { products } = data;

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
