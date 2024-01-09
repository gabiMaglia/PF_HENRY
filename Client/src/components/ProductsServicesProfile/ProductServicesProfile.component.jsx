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
import { filterService, getServices } from "../../services/serviceServices";
import logo from "../../../public/icons/logo.svg";
import {
  getUsersByRole,
  getUserById,
  putUser,
} from "../../services/userServices";
import { serviceStatuses } from "../../utils/serviceStatuses.js";

const ProductsServicesProfile = () => {
  const [filters, setFilters] = useState({
    users: null,
    status: null,
  });
  const [usersId, setUsersId] = useState([]);
  const [cardPerDates, setCardPerDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDetail, setOpenDetail] = useState(false);
  const [cardDetail, setCardDetail] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

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

  const getUsers = async () => {
    const users = await getUsersByRole("customer", authData.jwt);
    if (users.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error al obtener los usuarios",
        text: `${users}`,
      });
    } else {
      const usersName = users.data.map((user) => {
        return user.name + " " + user.surname + " ------- " + user.email;
      });
      setUsers(usersName);
      const usersId = users.data.map((user) => {
        return user.id;
      });
      setUsersId(usersId);
    }
    if (authData.userRole === "customer") {
      const user = await getUserById(authData.userId, authData.jwt);
      setUser(user);
    }
  };

  const handleFilterChange = async (newValue, clear, property) => {
    setOpenDetail(false);
    setCardPerDates([]);
    setIsLoading(true);
    if (!clear === "clear") {
      setFilters({ ...filters, [property]: null });
    } else {
      setFilters({ ...filters, [property]: newValue });
    }

    let userPosition;
    let response;
    if (property === "users") {
      users.forEach((user, index) => {
        user === newValue && (userPosition = index);
      });
      response = await filterService(
        filters.status,
        usersId[userPosition],
        authData.userId
      );
    } else {
      if (authData.userRole === "customer") {
        response = await filterService(newValue, authData.userId);
      } else {
        users.forEach((user, index) => {
          user === filters.users && (userPosition = index);
        });
        response = await filterService(
          newValue,
          usersId[userPosition],
          authData.userId
        );
        response = await filterService(
          newValue,
          usersId[userPosition],
          authData.userId
        );
      }
    }
    if (response.error) {
      Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "Error en la carga de productos",
        text: `${response?.error?.response?.statusText}`,
      });
      setIsLoading(false);
    } else {
      if (response.data.length === 0) {
        Swal.fire({
          allowOutsideClick: false,
          icon: "info",
          showDenyButton: true,
          confirmButtonText: "Sí",
          confirmButtonColor: "#fd611a",
          title: "Parace que no hay servicios que coincidan con tu busqueda",
          text: `¿Desea restablecer los filtros?`,
        }).then((result) => {
          if (result.isConfirmed) {
            getAllServices();
            setFilters({
              users: null,
              status: null,
            });
          } else {
            setIsLoading(false);
          }
        });
      } else {
        sortCards(response.data);
      }
    }
  };

  const handleOpenDetail = (id, open) => {
    open && setOpenDetail(open);
    id && setCardDetail(id);
  };

  useEffect(() => {
    if (
      user?.communication_preference === "Pendiente" &&
      authData.userRole === "customer"
    ) {
      Swal.fire({
        icon: "info",
        title: "Gracias por confiar en HyperMegaRed",
        text: `Elije el medio de comunicación que prefieres para recibir información sobre el estado del servicio`,
        confirmButtonText: "Email",
        showDenyButton: true,
        denyButtonText: "Whatsapp",
        denyButtonColor: "#25d366",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await putUser(user.id, authData.userRole, {
            communication_preference: "Email",
          });
        } else if (result.isDenied) {
          const response = await putUser(user.id, authData.userRole, {
            communication_preference: "Whatsapp",
          });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    getAllServices();
    getUsers();
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

  const statuses = [...serviceStatuses.progress, ...serviceStatuses.cancel];

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
          pt: ".5em",
          pb: ".5em",
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
            onChange={(e, newValue, clear) => {
              handleFilterChange(newValue, clear, "users");
            }}
            value={filters.users}
            options={users}
            renderInput={(params) => (
              <TextField name="users" {...params} label="Filtrar por usuario" />
            )}
          />
        )}
        <Autocomplete
          id={"status"}
          sx={{ width: "40%" }}
          selectOnFocus
          onChange={(e, newValue, clear) => {
            handleFilterChange(newValue, clear, "status");
          }}
          value={filters.status ? filters.status : null}
          options={statuses}
          renderInput={(params) => (
            <TextField name="status" {...params} label="Filtrar por estados" />
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
