import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CardCarousel from "../CardCarousel/CardCarousel.component";
import { fetchAllProducts } from "../../services/productServices";

const CarouselTopComponent = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Box sx={{cursor: "pointer" }}>
      <CardCarousel allProducts={allProducts} />
    </Box>
  );
};

export default CarouselTopComponent;
