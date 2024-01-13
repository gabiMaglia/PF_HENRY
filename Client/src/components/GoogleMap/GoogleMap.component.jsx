import { CardMedia } from "@mui/material";

const MapContainer = () => {
  return (
    <CardMedia
      component="iframe"
      title="Mi Iframe"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.292569396898!2d-58.399523723452!3d-34.723019063810014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccd28827c30bb%3A0xd13d20b43c2d99cc!2sHyperMegaRed!5e0!3m2!1ses!2sar!4v1705110555065!5m2!1ses!2sar"
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
