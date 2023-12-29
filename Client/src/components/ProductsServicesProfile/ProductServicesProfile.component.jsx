//HOOKS
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

//MATERIAL UI
import { Box, Divider, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
// SweetAlert2
import Swal from "sweetalert2";
//COMPONENTS
import UserPanelProductCard from "../UserPanelProductCard/UserPanelProductCard.component";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import { sortServiceCardByDate } from "../../utils/sortCardsByDate";
import PATHROUTES from "../../helpers/pathRoute";
import { getServices } from "../../services/serviceServices";
import logo from "../../../public/icons/logo.svg";

const cardsContent = [];

const ProductServicesProfileComponent = () => {
  const [cardPerDates, setCardPerDates] = useState([]);

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  const getAllServices = async () => {
    const services = await getServices();
    if (services.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Fallo en la carga de productos",
        text: `${services}`,
      });
    } else {
      let newCardsPerDates = sortServiceCardByDate(services.data, [
        ...cardPerDates,
      ]);
      console.log(newCardsPerDates);
      setCardPerDates(newCardsPerDates);
    }
  };

  useEffect(() => {}, [cardsContent]);

  useEffect(() => {
    getAllServices();
  }, []);

  const userRole = authData.userRole;

  const buttons = [{ text: "Detalle servicio", action: "", color: "#fd611a" }];

  return (
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
            textAlign: "center",
          }}
        >
          <Typography variant="h5">
            No tienes equipos registrados en reparación
          </Typography>
          <Link
            to={
              userRole === "customer"
                ? PATHROUTES.SUPPORT
                : userRole === "technician" &&
                  PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.CREATE_SERVICES
            }
          >
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
          const splitDate = cardsPerDate.date.split("-");
          const date = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
          return (
            <Box
              key={date}
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
                {date}
              </Typography>
              {cardsPerDate.cards.map((product, index) => {
                const card = {
                  id: product.product_id,
                  name: product.product_model,
                  image:
                    product.Service_images.length > 0
                      ? product.Service_images[0].address
                      : "error",
                  budget: "presupuesto: " + product.Service_status.budget,
                  state: product.Service_status.repair_finish
                    ? "Finalizado"
                    : product.Service_status.confirm_repair
                    ? "Presupuesto aceptado, esperando reparación"
                    : "Esperando",
                };
                return (
                  <Box
                    key={card.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UserPanelProductCard
                      product={card}
                      buttons={buttons}
                      alternativeImage={logo}
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
