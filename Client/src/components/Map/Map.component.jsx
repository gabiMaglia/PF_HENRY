import React from 'react';
import { CardMedia } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";

const MapContainer = () => {

  const smallScreen = useMediaQuery("(max-width:768px)");
 
  return (
    <CardMedia
    component="iframe"
      title="Mi Iframe"
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13370.635403521792!2d-60.6168978!3d-33.09175865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1702589341249!5m2!1ses-419!2sar"
      sx={{borderRadius:"10px", margin:smallScreen?"0 0 0 0":"0 0 0 30px", backgroundColor:"red"}}/>
  )
}

export default MapContainer;