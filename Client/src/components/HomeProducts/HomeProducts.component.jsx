//HOOKS
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//MATERIAL UI
import { Container, Typography, CircularProgress, Box } from "@mui/material";
//COMPONENTS
import ProductCard from "../ProductCard/ProductCard.component";

const HomeProducts = ({ allProducts }) => {
  const dispatch = useDispatch();
  const [homeProducts, setHomeProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        startTime = Date.now();

        const shuffledProducts = shuffleArray(allProducts);
        setHomeProducts(shuffledProducts.slice(0, 9));
      } catch (error) {
        console.error("Error fetching home products:", error);
        setError(true);
      } finally {
        if (startTime) {
          const minimumLoadingTime = 3000;
          const remainingTime = Math.max(
            0,
            minimumLoadingTime - (Date.now() - startTime)
          );
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, allProducts]);

  if (loading) {
    return (
      <>
        <Box sx={{ minHeight: "70vh" }}>
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
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Cargando...
            </Typography>
          </Container>
        </Box>
      </>
    );
  }

  if (!homeProducts.length) {
    return (
      <>
        <Box>
          <Container>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "red",
                marginTop: "32px",
                marginBottom: "32px",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Por el momento no hay productos disponibles.
            </Typography>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            // backgroundColor: "#000",
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#00000",
              fontWeight: "900",
            }}
          >
            Productos Destacados
          </Typography>
        </Box>
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
      </Box>
    </>
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
