import { Avatar, Box, CardMedia, Divider, Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar.component";
import { useSelector } from "react-redux";
import getFirstLetters from "../../helpers/getFirstLetters";
import EditIcon from "@mui/icons-material/Edit";

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
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
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
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
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
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
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
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
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
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
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
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
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
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
              />
            </Box>
            <Divider sx={dividerStyle} />
            <Box sx={itemBoxStyle}>
              <Box sx={{ flexGrow: "1" }}>
                <Typography
                  variant="caption"
                  sx={{ mb: ".1em" }}
                >
                  Codigo postal
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: "1em" }}
                >
                  {userAddress.zipCode
                    ? userAddress.zipCode
                    : "No se definio un codigo postal"}
                </Typography>
              </Box>
              <EditIcon
                sx={{
                  cursor: "pointer",
                  color: "black",
                }}
              />
            </Box>
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
