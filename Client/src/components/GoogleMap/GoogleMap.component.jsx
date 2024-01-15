//HOOKS
import GoogleMapReact from "google-map-react";
//MATERIAL UI
import { Box, Typography, Link } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const apikey = import.meta.env.VITE_GOOGLE_MAPS;

const AnyReactComponent = ({ text }) => (
  <Box>
    <LocationOnIcon sx={{ fontSize: "32px", color: "#fd611a" }} />
    <Typography variant="body2" sx={{ fontWeight: "800", color: "#000" }}>
      {text}
    </Typography>
  </Box>
);

const MapContainer = () => {
  const defaultProps = {
    center: {
      lat: -34.7229901,
      lng: -58.3971712,
    },
    zoom: 15,
  };
  return (
    <>
      <Link
        href="https://maps.app.goo.gl/rGM9QV8Z8RGH2mYu8"
        target="_blank"
        rel="noreferrer"
      >
        <Box sx={{ height: "30vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apikey }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={-34.7229901}
              lng={-58.3971712}
              text="Hyper Mega Red"
            />
          </GoogleMapReact>
        </Box>
      </Link>
    </>
  );
};

export default MapContainer;
