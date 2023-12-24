//MATERIAL UI
import { CardMedia } from "@mui/material";

const MapContainer = () => {

  return (
    <CardMedia
      component="iframe"
      title="Mi Iframe"
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13370.635403521792!2d-60.6168978!3d-33.09175865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1702589341249!5m2!1ses-419!2sar"
      sx={{
        borderRadius: "10px",
        border: "none",
        maxWidth: "55vw",
        height: "300px",
        margin: "10px auto 50px auto",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.7)",
        "@media (max-width: 1140px)": {
          display: "none"
        }
      }}
    />
  );
};

export default MapContainer;
