import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DiscountBanner = ({text, rotate}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "85px",
        opacity: '0.7',
        left: {
            xs: '165px',
            md: '235px',
            lg: '285px',
            xl: '405px',
            xxl: '490px'
        },
        transform: `rotate(${rotate}deg)`,
        mozTransform: `rotate(${rotate}deg)`,
        fontFamily: " sans-serif",
        overflow: 'hidden',
    }}
    >
      <Typography
         variant="h6"
        sx={{
           
            margin: 0,
            color: "#fff",
            fontWeight:'800',
            background: "#ff0000",
            padding: "13px 85px 15px 80px",
            boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.4)",
            fontSize: " .9em",
            textAlign: 'center',
            minWidth: '430px',
            
           
        }}
      >
       {text}
      </Typography>
    </Box>
  );
};

export default DiscountBanner;
