//MATERIAL UI
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserProfileProductCard from "../UserProfileProductCard/UserProfileProductCard.component";
import { useEffect, useState } from "react";
import PATHROUTES from "../../helpers/pathRoute";
import { useSelector } from "react-redux";

const cardsContent = [
  {
    id: 1,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$45000",
  },
  {
    id: 2,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$75000",
  },
  {
    id: 3,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$55000",
  },
  {
    id: 4,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$120000",
  },
  {
    id: 5,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$52500",
  },
  {
    id: 6,
    image:
      "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
    name: "Monitor Samsung 15 pulgadas",
    budget: "$85000",
  },
];
const buttons = [{ text: "Agregar al carrito", action: "", color: "#fd611a" }];

const WhishListProfileComponent = () => {
  const dividerStyle = {
    width: "100%",
    height: "1px",
    alignSelf: "center",
    backgroundColor: "black",
  };

  const wishListCards = useSelector((state) => state.wishlist);
  console.log(wishListCards);

  const [cardStatus, setCardStatus] = useState(
    cardsContent.map((card) => {
      return { id: card.id, status: false };
    })
  );

  useEffect(() => {}, [wishListCards]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let newCardStatus = [...cardStatus];
    if (name === "all") {
      newCardStatus = newCardStatus.map((card) => {
        return { id: card.id, status: checked };
      });
    } else {
      newCardStatus[name].status = checked;
    }
    setCardStatus(newCardStatus);
  };

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
      {cardsContent.length === 0 ? (
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
            Aun no tienes equipos agregados a tu lista de deseados
          </Typography>
          <Link to={PATHROUTES.PRODUCTS}>
            <Button
              style={{
                backgroundColor: "#fd611a",
                color: "white",
              }}
            >
              Explorar equipos
            </Button>
          </Link>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: "75%",
              zIndex: "10",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              pb: "1em",
              position: "absolute",
              backgroundColor: "white",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", flexGrow: "1" }}>
              <FormControlLabel
                sx={{ ml: "0em" }}
                control={<Checkbox onChange={handleChange} name={"all"} />}
                label="Seleccionar todos"
              />
            </Box>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#fd611a",
                color: "white",
              }}
              sx={{ mr: "3.5em" }}
            >
              Eliminar selección
            </Button>
          </Box>
          <Box sx={{ mt: "4em" }}>
            {cardsContent.map((card, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Divider sx={dividerStyle} />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      height: "100%",
                      pt: "1em",
                      pb: "1em",
                    }}
                  >
                    <Checkbox
                      name={`${index}`}
                      checked={cardStatus[index].status}
                      onChange={handleChange}
                    />
                    <Box sx={{ flexGrow: "1" }}>
                      <UserProfileProductCard
                        product={card}
                        buttons={buttons}
                      />
                    </Box>
                  </Box>
                  {index + 1 === cardsContent.length && (
                    <Divider sx={dividerStyle} />
                  )}
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default WhishListProfileComponent;
