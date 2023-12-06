import React from "react";
import HomeProducts from "../HomeProducts/HomeProducts.component";
import data from "../../dataBase/bdd.json";
import { Typography } from "@mui/material";

const HomeComponent = () => {
  const { products } = data;

  return (
    <>
      <div>
        <Typography paddingLeft={8} margin={2} fontWeight={"bold"}>
          ÚLTIMAS NOVEDADES
        </Typography>
        <HomeProducts products={products} />
      </div>
    </>
  );
};

export default HomeComponent;
