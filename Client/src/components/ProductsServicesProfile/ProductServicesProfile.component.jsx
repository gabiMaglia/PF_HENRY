//HOOKS
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

//MATERIAL UI
import { Box, Divider, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
//COMPONENTS
import ProductsServicesCustomer from "../ProductsServicesCustomer/ProductsServicesCustomer.component";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import sortCardByDate from "../../utils/sortCardsByDate";
import PATHROUTES from "../../helpers/pathRoute";

const cardsContent = [
  {
    id: 1,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "Presupuesto: enviado",
    state: "Producto en revisión",
    date: "01/12/2023",
  },
  {
    id: 2,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "Presupuesto: $3500",
    state: "Producto en revisión",
    date: "01/12/2023",
  },
  {
    id: 3,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "Presupuesto: $3500",
    state: "Producto en revisión",
    date: "10/12/2023",
  },
  {
    id: 4,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "Presupuesto: $3500",
    state: "Producto en revisión",
    date: "10/12/2023",
  },
  {
    id: 5,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "Presupuesto: $3500",
    state: "Producto en revisión",
    date: "15/12/2023",
  },
  {
    id: 6,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "Presupuesto: $3500",
    state: "Producto en revisión",
    date: "20/12/2023",
  },
];

const ProductServicesProfileComponent = () => {
  const [cardPerDates, setCardPerDates] = useState([]);

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  useEffect(() => {
    let newCardsPerDates = sortCardByDate(cardsContent, [...cardPerDates]);
    setCardPerDates(newCardsPerDates);
  }, [cardsContent]);

  const userRole = authData.userRole;

  const buttons = [
    { text: "Detalle servicio", action: "", color: "#fd611a" },
    { text: "Aceptar", action: "", color: "grey" },
    { text: "Rechazar", action: "", color: "black" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "500px",
        mt: "1.2em",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {userRole === "admin" ? (
        <p>Contenido de PRODUCTS SERVICVES (admin)</p>
      ) : cardPerDates.length === 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2em",
          }}
        >
          <Typography variant="h5">
            No tienes equipos registrados en reparación
          </Typography>
          <Link to={PATHROUTES.SUPPORT}>
            <Button
              style={{
                backgroundColor: "#fd611a",
                color: "white",
              }}
            >
              Ingresar un equipo
            </Button>
          </Link>
        </Box>
      ) : (
        cardPerDates.map((cardsPerDate) => {
          return (
            <Box
              key={cardsPerDate.date}
              sx={{
                border: "1px solid black",
                borderRadius: "10px",
                mb: "1em",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", pl: "1em", pt: "1em" }}
              >
                {cardsPerDate.date}
              </Typography>
              {cardsPerDate.cards.map((card, index) => {
                return (
                  <Box
                    key={card.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <ProductsServicesCustomer
                      product={card}
                      buttons={buttons}
                    />
                    {index + 1 !== cardsPerDate.cards.length && (
                      <Divider
                        sx={{
                          width: "90%",
                          height: "1px",
                          alignSelf: "center",
                          backgroundColor: "black",
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default ProductServicesProfileComponent;
