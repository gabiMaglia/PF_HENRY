import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard.component";
import { Container, Typography, CircularProgress } from "@mui/material";

const HomeProducts = ({ allProducts }) => {
  const dispatch = useDispatch();
  const [homeProducts, setHomeProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      let startTime;
      try {
        // Simular una carga durante 2 segundos (puedes ajustar este tiempo)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        startTime = Date.now();

        const shuffledProducts = shuffleArray(allProducts);
        setHomeProducts(shuffledProducts.slice(0, 9));
      } catch (error) {
        console.error("Error fetching home products:", error);
      } finally {
        if (startTime) {
          const minimumLoadingTime = 2000;
          const remainingTime = Math.max(
            0,
            minimumLoadingTime - (Date.now() - startTime)
          );

          // Simular una carga durante el tiempo especificado (mínimo de 2 segundos)
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, allProducts]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "space-around",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <CircularProgress
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: 5,
            color: "#fd611a",
          }}
        />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Cargando...
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginBottom: 5,
          marginTop: 5,
          gap: 2,
          [`@media (max-width: 1140px)`]: {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {homeProducts.map((product, index) => (
          <ProductCardWithFade
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </Container>
    </Container>
  );
};

const ProductCardWithFade = ({ product, index }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1);
    }, index * 500);

    return () => {
      clearTimeout(fadeInTimeout);
    };
  }, [index]);

  return (
    <div
      style={{
        opacity: opacity,
        transition: "opacity 0.5s ease-in",
      }}
    >
      <ProductCard product={product} />
    </div>
  );
};

export default HomeProducts;
