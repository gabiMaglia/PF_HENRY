//HOOKS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//MATRIAL UI
import { Box, Card } from "@mui/material";
//COMPONENTS
import CardCarousel from "../CardCarousel/CardCarousel.component";
//SERVICES
import { fetchAllProducts } from "../../services/productServices";

const CarouselTopComponent = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Box sx={{ paddingTop: "10px", cursor: "pointer" }}>
      <CardCarousel allProducts={allProducts} />
    </Box>
  );
};

export default CarouselTopComponent;
