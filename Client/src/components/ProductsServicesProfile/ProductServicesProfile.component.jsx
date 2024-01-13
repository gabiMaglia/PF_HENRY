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
import Loading from "../Loading/Loading.component";
import DetailProductService from "../DetailProductService/DetailProductService.component";
import ToolbarServiceProfile from "../ToolbarServiceProfile/ToolbarServiceProfile.component.jsx";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import { sortServiceCardByDate } from "../../utils/sortCardsByDate";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
//SERVICES
import { getServices } from "../../services/serviceServices";
import logo from "../../../public/icons/logo.svg";

const ProductsServicesProfile = () => {
  const [cardPerDates, setCardPerDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDetail, setOpenDetail] = useState(false);
  const [cardDetail, setCardDetail] = useState([]);

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  const sortCards = (data) => {
    if (data.length === 0) {
      setIsLoading(false);
    }
    let newCardsPerDates = sortServiceCardByDate(data, []);
    setCardPerDates(newCardsPerDates);
  };

  const getAllServices = async () => {
    const services = await getServices(authData.userId, authData.jwt);
    if (services.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en la carga de productos",
        text: `${services.error.message}`,
      });
      setIsLoading(false);
    } else {
      if (services.error || services.data.length === 0) {
        setIsLoading(false);
      } else {
        sortCards(services.data);
      }
    }
  };

  const handleOpenDetail = (id, open) => {
    open && setOpenDetail(open);
    if (id) {
      const newId = typeof id === "object" ? id.id : id;
      setCardDetail(newId);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const userRole = authData.userRole;

  const buttons = [
    {
      text: "Detalle servicio",
      action: handleOpenDetail,
      color: "#fd611a",
      actionParam: true,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        position: "relative",
      }}
    >
      <ToolbarServiceProfile
        authData={authData}
        getAllServices={getAllServices}
        setCardPerDates={setCardPerDates}
        setIsLoading={setIsLoading}
        sortCards={sortCards}
      />
      <Box
        sx={{
          position: "relative",
          height: "100%",
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
            <Typography variant="h5">
              No tienes equipos registrados en reparación
            </Typography>
            <Link
              to={
                authData.userRole === "customer"
                  ? PATHROUTES.SUPPORT
                  : userRole === "technician" &&
                    PATHROUTES.TECHNICIAN_USER_PANEL + PATHROUTES.SERVICE_CREATE
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
        ) : openDetail ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              zIndex: "10",
            }}
          >
            <DetailProductService
              id={cardDetail}
              authData={authData}
              setOpenDetail={setOpenDetail}
              setIsLoading={setIsLoading}
              getAllServices={getAllServices}
            />
          </Box>
        ) : (
          <Box sx={{ pt: ".5em", pb: ".2em" }}>
            {cardPerDates.map((cardsPerDate, key) => {
              const splitDate = cardsPerDate.date.split("-");
              const date =
                splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
              return (
                <Box
                  key={`${key}${date}`}
                  sx={{
                    mb: "1em",
                    border: "1px solid black",
                    borderRadius: "10px",
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
                      id: product.id,
                      name: product.product_model,
                      image:
                        product.Service_images.length > 0
                          ? product.Service_images[0].address
                          : "error",
                      budget: "presupuesto: " + product.Service_status.budget,
                      state: product.Service_status.status,
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
                          handleCardClick={handleOpenDetail}
                          actionParam={true}
                          product={card}
                          buttons={buttons}
                          alternativeImage={logo}
                          setIsLoading={setIsLoading}
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
        {isLoading && <Loading />}
      </Box>
    </Box>
  );
};

export default ProductsServicesProfile;
