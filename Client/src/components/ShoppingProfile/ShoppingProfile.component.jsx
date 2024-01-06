//MATERIAL UI
import { Box, Typography, Divider, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserPanelProductCard from "../UserPanelProductCard/UserPanelProductCard.component";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import sortCardByDate from "../../utils/sortCardsByDate";
import PATHROUTES from "../../helpers/pathRoute";

const cardsContent = [
  {
    id: 1,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$14400",
    state: "Pendiente",
    date: "01/12/2023",
  },
  {
    id: 2,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$122000",
    state: "Cancelado",
    date: "01/12/2023",
  },
  {
    id: 3,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$144000",
    state: "Entregado",
    date: "10/12/2023",
  },
  {
    id: 4,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$1400",
    state: "Entregado",
    date: "10/12/2023",
  },
  {
    id: 5,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$14400",
    state: "Cancelado",
    date: "15/12/2023",
  },
  {
    id: 6,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$156000",
    state: "Pendiente",
    date: "20/12/2023",
  },
];

const handleClick = () => {
  Swal.fire({
    icon: "warning",
    iconColor: "#fd611a",
    title: "Funcionalidad en construcción",
    showCancelButton: true,
    confirmButtonColor: "#fd611a",
    confirmButtonText: "Ir a inicio",
    cancelButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      navigate(PATHROUTES.HOME);
    }
  });
};

const buttons = [
  { text: "Detalle compra", action: handleClick, color: "black" },
  { text: "Volver a comprar", action: handleClick, color: "#fd611a" },
];

const ShoppingProfileComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardPerDates, setCardPerDates] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get("success");
    if (param) {
      console.log(param);
      Swal.fire({
        icon: "success",
        title: "Gracias por elegir HyperMegaRed",
        text: "¡Esperamos que disfrutes de tu nuevo producto!",
        confirmButtonColor: "#fd611a",
        confirmButtonText: "Ir a inicio",
        cancelButtonText: "Quedarse en mis compras",
        cancelButtonColor: "green",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(PATHROUTES.HOME);
          window.scrollTo(0, 0);
        }
      });
    }
  }, []);

  useEffect(() => {
    let newCardsPerDates = sortCardByDate(cardsContent, [...cardPerDates]);
    setCardPerDates(newCardsPerDates);
  }, [cardsContent]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mt: "1.2em",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {cardPerDates.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2em",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">No existen compras registradas</Typography>
            <Link to={PATHROUTES.PRODUCTS}>
              <Button
                style={{
                  backgroundColor: "#fd611a",
                  color: "white",
                }}
              >
                Ir a comprar
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
                      <UserPanelProductCard product={card} buttons={buttons} />
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
    </>
  );
};

export default ShoppingProfileComponent;
