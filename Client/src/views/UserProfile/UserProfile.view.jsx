import { Avatar, Box, Divider, Typography } from "@mui/material";
import SideBar from "../../components/SideBar/SideBar.component";
import { Image } from "@mui/icons-material";

const userProvisonalInfo = {
  name: "Martín",
  surname: "Galiotti Martinez",
  birthdate: "14/11/2001",
  dni: "43852529",
  email: "martingaliottimartinez@gmail.com",
  telephone: "2345563285",
  image: "",
  role: "customer",
  userAddress: {
    country: "Argentina",
    state: "Buenos Aires",
    city: "Buenos Aires",
    street: "Saladillo",
    number: 329,
    zipCode: 7260,
  },
  userCredentials: {
    username: "martin21",
    password: "Martin2001",
  },
};

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
  } = userProvisonalInfo;

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
          {userProvisonalInfo.image.length > 0 ? (
            <Image sx={{ mb: "1em", mt: "2em" }}>
              {userProvisonalInfo.image}
            </Image>
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
              {userProvisonalInfo.name[0]}
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
            {name + " " + surname}
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
            {birthdate}
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
            {email}
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
            {telephone}
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
            {dni}
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
            {userAddress.country}, {userAddress.state}, {userAddress.city},{" "}
            {userAddress.street}, {userAddress.number}
          </Typography>
          <Divider sx={dividerStyle} />
          <Typography
            variant="caption"
            sx={{ mb: ".1em" }}
          >
            Codigo de area
          </Typography>
          <Typography variant="body2">{userAddress.zipCode}</Typography>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
