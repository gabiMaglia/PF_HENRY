//HOOKS
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//MATERIAL UI
import { Box, Divider, Typography } from "@mui/material";
//COMPONENTS
import ProductsServicesCustomer from "../ProductsServicesCustomer/ProductsServicesCustomer.component";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";

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
    let newCardsPerDates = [...cardPerDates];
    cardsContent.forEach((card) => {
      let position = -1;
      newCardsPerDates.forEach((cardPerDate, index) => {
        cardPerDate.date === card.date ? (position = index) : "";
      });
      if (position >= 0) {
        newCardsPerDates[position].cards.push(card);
        setCardPerDates(newCardsPerDates);
      } else {
        newCardsPerDates.push({ date: card.date, cards: [card] });
        setCardPerDates(newCardsPerDates);
      }
    });
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
      }}
    >
      {userRole === "admin" ? (
        <p>Contenido de PRODUCTS SERVICVES (admin)</p>
      ) : (
        <Box
          sx={{
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {cardPerDates.map((cardsPerDate) => {
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
          })}
        </Box>
      )}
    </Box>
  );
};

export default ProductServicesProfileComponent;
