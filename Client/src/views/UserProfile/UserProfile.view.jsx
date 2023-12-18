import { Avatar, Box, CardMedia, Divider, Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar.component";
import { useSelector } from "react-redux";
import getFirstLetters from "../../helpers/getFirstLetters";

const UserProfile = () => {
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
  } = useSelector((state) => state.user);

  const initialLetersUsers = {
    name: getFirstLetters(name),
    surname: getFirstLetters(surname),
  };

  const dividerStyle = {
    height: ".1em",
    backgroundColor: "black",
    width: "70%",
    mb: ".5em",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <SideBar />
      {login ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            border: ".1em solid grey",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: "70%",
            }}
          >
            {image && image.length > 0 ? (
              <CardMedia
                component="img"
                alt="Imagen de usuario"
                sx={{ mb: "1em", mt: "2em", width: "3em", height: "3em" }}
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
            <Typography
              variant="caption"
              sx={{ mb: ".1em" }}
            >
              Nombre(s) y apelido(s)
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: ".5em" }}
            >
              {name && surname
                ? name + " " + surname
                : "No se definio un nombre o apellido"}
            </Typography>
            <Divider sx={dividerStyle} />
            <Typography
              variant="caption"
              sx={{ mb: ".1em" }}
            >
              Fecha de nacimiento
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: ".5em" }}
            >
              {birthdate ? birthdate : "No se definio una fecha de nacimiento"}
            </Typography>
            <Divider sx={dividerStyle} />
            <Typography
              variant="caption"
              sx={{ mb: ".1em" }}
            >
              Email
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: ".5em" }}
            >
              {email ? email : "No se definio un email"}
            </Typography>
            <Divider sx={dividerStyle} />
            <Typography
              variant="caption"
              sx={{ mb: ".1em" }}
            >
              Numero de telefono
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: ".5em" }}
            >
              {telephone ? telephone : "No se definio un numero de telefono"}
            </Typography>
            <Divider sx={dividerStyle} />
            <Typography
              variant="caption"
              sx={{ mb: ".1em" }}
            >
              DNI
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: ".5em" }}
            >
              {dni ? dni : "No se definio un DNI"}
            </Typography>
            <Divider sx={dividerStyle} />
            <Typography
              variant="caption"
              sx={{ mb: ".1em" }}
            >
              Dirección
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: ".5em" }}
            >
              {userAddress.country &&
              userAddress.state &&
              userAddress.city &&
              userAddress.street &&
              userAddress.number
                ? (userAddress.country,
                  userAddress.state,
                  userAddress.city,
                  userAddress.street,
                  userAddress.number)
                : "No se definio una dirección"}
            </Typography>
            <Divider sx={dividerStyle} />
            <Typography
              variant="caption"
              sx={{ mb: ".1em" }}
            >
              Codigo de area
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: "1em" }}
            >
              {userAddress.zipCode
                ? userAddress.zipCode
                : "No se definio un codigo de area"}
            </Typography>
            <Divider />
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default UserProfile;
