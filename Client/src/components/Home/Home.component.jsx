import React from "react";
import HomeProducts from "../HomeProducts/HomeProducts.component";
import Carousel from "../../components/Carousel/Carousel.component";
import data from "../../dataBase/bdd.json";

const HomeComponent = () => {
  const { products } = data;

  return (
    <>
      <div>
        <Carousel />
        <HomeProducts products={products} />
      </div>
    </>
  );
};

export default HomeComponent;
