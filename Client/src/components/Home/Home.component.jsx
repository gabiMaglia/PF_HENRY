import React from "react";
import HomeProducts from "../HomeProducts/HomeProducts.component";
import CarouselTop from "../../components/CarouselTop/CarouselTop.component";
import data from "../../dataBase/bdd.json";

const HomeComponent = () => {
  const { products } = data;

  return (
    <>
      <div>
        <CarouselTop />
        <HomeProducts products={products} />
      </div>
    </>
  );
};

export default HomeComponent;
