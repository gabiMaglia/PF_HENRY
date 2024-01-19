import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DiscountBanner = ({ text, rotate }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "85px",
        opacity: "0.7",
        left: {
          xs: "165px",
          md: "235px",
          lg: "285px",
          xl: "405px",
          xxl: "490px",
        },
        transform: `rotate(${rotate}deg)`,
        mozTransform: `rotate(${rotate}deg)`,
        fontFamily: " sans-serif",
        overflow: "hidden",
      }}
    >
      <Box sx={{ background: "#ff0000", padding: "15px 0px 15px 115px" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: "800",
            fontSize: " 1em",
            textAlign: "center",
            width: "430px",
            position: "relative",
            right: "30px"
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default DiscountBanner;
