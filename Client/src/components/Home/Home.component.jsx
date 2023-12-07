import React from "react";
import HomeProducts from "../HomeProducts/HomeProducts.component";
import data from "../../dataBase/bdd.json";
import { Typography, Container } from "@mui/material";

const HomeComponent = () => {
  const { products } = data;

  return (
    <div>
      <HomeProducts products={products} />
    </div>
  );
};

export default HomeComponent;
