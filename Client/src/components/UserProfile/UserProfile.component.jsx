//HOOKS
import { useState } from "react";
import { useSelector } from "react-redux";
//MATERIAL UI
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, CardMedia, Divider, Typography } from "@mui/material";
//HELPERS
import getFirstLetters from "../../helpers/getFirstLetters";
//MODAL
import EditModal from "../EditModal/EditModal";

const UserProfile = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editInfo, setEditInfo] = useState({
    dataName: "",
    previousValue: "",
    dataList: [],
  });

  const {
    name,
    surname,
    birthdate,
    dni,
    email,
    telephone,
    image,
    userAddress,
    login,
    communication_preference,
  } = useSelector((state) => state.user);
  const initialLetersUsers = {
    name: getFirstLetters(name),
    surname: getFirstLetters(surname),
  };

  const handleEditClick = (dataName) => {
    let previousValue = "";
    let dataList = [];
    switch (dataName) {
      case "nombre y apellido":
        dataList = [
          { es: "Nombre", en: "name" },
          { es: "Apellido", en: "surname" },
        ];
        previousValue = name + " " + surname;
        break;
      case "fecha de nacimiento":
        dataList = [{ es: "Fecha de nacimiento", en: "birthdate" }];
        previousValue = birthdate;
        break;
      case "email":
        dataList = [{ es: "Email", en: "email" }];
        previousValue = email;
        break;
      case "telefono":
        dataList = [
          { es: "Codigo de area", en: "phoneNumberAreaCode" },
          { es: "Telefono", en: "phoneNumber" },
        ];
        previousValue = telephone;
        break;
      case "DNI":
        dataList = [{ es: "DNI", en: "dni" }];
        previousValue = dni;
        break;
      case "dirección":
        dataList = [
          { es: "Pais", en: "country" },
          { es: "Provincia", en: "state" },
          { es: "Ciudad", en: "city" },
          { es: "Calle", en: "street" },
          { es: "Numero", en: "number" },
          { es: "Codigo postal", en: "zipCode" },
        ];
        previousValue = userAddress;
        break;
      default:
        break;
    }
    setEditInfo({
      dataName: dataName,
      previousValue: previousValue,
      dataList: dataList,
    });
    setEditModalIsOpen(true);
  };

  const dividerStyle = {
    height: "1px",
    backgroundColor: "black",
    width: "100%",
    mb: ".5em",
  };

  const itemBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      {login ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            {image && image.length > 0 ? (
              <CardMedia
                component="img"
                alt="Imagen de usuario"
                sx={{
                  mb: "1em",
                  mt: "2em",
                  width: "3em",
                  height: "3em",
                }}
                image={image}
              />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: "#fd611a",
                  mt: "2em",
                  mb: "1em",
                  width: "3em",
                  height: "3em",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {initialLetersUsers.name + initialLetersUsers.surname}
                </Typography>
              </Avatar>
            )}
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em", fontWeight: "bold" }}
                >
                  Nombre(s) y apelido(s)
                </Typography>
                <Typography variant="h6" sx={{ mb: ".5em" }}>
                  {name && surname
                    ? name + " " + surname
                    : "No se definio un nombre o apellido"}
                </Typography>
              </Box>

              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={() => handleEditClick("nombre y apellido")}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em", fontWeight: "bold" }}
                >
                  Fecha de nacimiento
                </Typography>
                <Typography variant="body2" sx={{ mb: ".5em" }}>
                  {birthdate
                    ? birthdate
                    : "No se definio una fecha de nacimiento"}
                </Typography>
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={() => handleEditClick("fecha de nacimiento")}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em", fontWeight: "bold" }}
                >
                  Email
                </Typography>
                <Typography variant="body1" sx={{ mb: ".5em" }}>
                  {email ? email : "No se definio un email"}
                </Typography>
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={() => handleEditClick("email")}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em", fontWeight: "bold" }}
                >
                  Numero de telefono
                </Typography>
                <Typography variant="body2" sx={{ mb: ".5em" }}>
                  {telephone
                    ? telephone
                    : "No se definio un numero de telefono"}
                </Typography>
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={() => handleEditClick("telefono")}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em", fontWeight: "bold" }}
                >
                  DNI
                </Typography>
                <Typography variant="body2" sx={{ mb: ".5em" }}>
                  {dni ? dni : "No se definio un DNI"}
                </Typography>
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={() => handleEditClick("DNI")}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em", fontWeight: "bold" }}
                >
                  Dirección
                </Typography>

                {userAddress.country &&
                userAddress.state &&
                userAddress.city &&
                userAddress.street &&
                userAddress.number ? (
                  <Typography variant="body2" sx={{ mb: ".5em" }}>
                    {userAddress.street} {userAddress.number},{" "}
                    {userAddress.city}, {userAddress.state},{" "}
                    {userAddress.country}
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ mb: ".5em" }}>
                    No se definio una dirección
                  </Typography>
                )}
                <Box sx={{ flexGrow: "1" }}>
                  <Typography
                    variant="caption"
                    sx={{ mb: ".1em", fontWeight: "bold" }}
                  >
                    Codigo postal
                  </Typography>
                  <Typography variant="body2" sx={{ mb: "1em" }}>
                    {userAddress.zipCode
                      ? userAddress.zipCode
                      : "No se definio un codigo postal"}
                  </Typography>
                </Box>
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={() => handleEditClick("dirección")}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em", fontWeight: "bold", color: "#fd611a" }}
                >
                  Preferencia de comunicación
                </Typography>
                <Typography variant="body2" sx={{ mb: ".5em" }}>
                  {communication_preference
                    ? communication_preference
                    : "Pendiente"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        ""
      )}

      {editModalIsOpen ? (
        <EditModal
          key={editInfo.dataName}
          isOpen={editModalIsOpen}
          setIsOpen={setEditModalIsOpen}
          dataName={editInfo.dataName}
          previousValue={editInfo.previousValue}
          dataList={editInfo.dataList}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default UserProfile;
