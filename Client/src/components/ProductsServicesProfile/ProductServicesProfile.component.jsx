//HOOKS
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

//MATERIAL UI
import {
  Box,
  Divider,
  Typography,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
// SweetAlert2
import Swal from "sweetalert2";
//COMPONENTS
import UserPanelProductCard from "../UserPanelProductCard/UserPanelProductCard.component";
import Loading from "../Loading/Loading.component";
import DetailProductService from "../DetailProductService/DetailProductService.component";
//UTILS
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";
import { sortServiceCardByDate } from "../../utils/sortCardsByDate";
import PATHROUTES from "../../helpers/pathRoute";
import { getServices } from "../../services/serviceServices";
import logo from "../../../public/icons/logo.svg";

const ProductServicesProfileComponent = () => {
  const [cardPerDates, setCardPerDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDetail, setOpenDetail] = useState(false);
  const [cardDetail, setCardDetail] = useState([]);

  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);

  const getAllServices = async () => {
    const services = await getServices(authData.userId);
    if (services.error && services.error.message !== "service not found") {
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
        let newCardsPerDates = sortServiceCardByDate(services.data, [
          ...cardPerDates,
        ]);
        setCardPerDates(newCardsPerDates);
      }
    }
  };

  const handleOpenDetail = (open, id) => {
    open && setOpenDetail(open);
    id && setCardDetail(id);
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
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          borderRadius: "10px",
          mt: ".5em",
          backgroundColor: "white",
          pt: ".3em",
          pb: ".3em",
          zIndex: "10",
          gap: "15%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {authData.userRole === "technician" && (
          <Autocomplete
            id={"users"}
            sx={{ width: "40%" }}
            selectOnFocus
            // onChange={handleUserChange}
            // value={technicianListValue}
            // options={techniciansName}
            renderInput={(params) => (
              <TextField
                // error={Boolean(errors.technician)}
                name="users"
                {...params}
                label="Filtrar por usuario"
              />
            )}
          />
        )}
        <Autocomplete
          id={"status"}
          sx={{ width: "40%" }}
          selectOnFocus
          // onChange={handleUserChange}
          // value={technicianListValue}
          // options={techniciansName}
          renderInput={(params) => (
            <TextField
              // error={Boolean(errors.technician)}
              name="status"
              {...params}
              label="Filtrar por estados"
            />
          )}
        />
      </Box>
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
                    PATHROUTES.TECHNICIAN_USER_PANEL +
                      PATHROUTES.CREATE_SERVICES
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
            <DetailProductService id={cardDetail} />
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
        {/* Cargando */}
        {isLoading && <Loading />}
      </Box>
    </Box>
  );
};

export default ProductServicesProfileComponent;
