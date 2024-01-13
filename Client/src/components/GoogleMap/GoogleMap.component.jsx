import { CardMedia } from "@mui/material";

const MapContainer = () => {

  return (
    <CardMedia
      component="iframe"
      title="Mi Iframe"
      src="https://www.google.com/maps/place/HyperMegaRed/@-34.7230191,-58.3995237,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccd28827c30bb:0xd13d20b43c2d99cc!8m2!3d-34.7230235!4d-58.3969488!16s%2Fg%2F11vph2mhb9?authuser=0&entry=ttu"
      sx={{
        border: "none",
        maxWidth: "100%",
        height: "250px",
        margin: "0",
      }}
    />
  );
};

export default MapContainer;