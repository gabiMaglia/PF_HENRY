import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { getServicesById } from "../../services/serviceServices";
import useTheme from "@mui/system/useTheme";

const DetailProductService = ({ id }) => {
  const [data, setData] = useState({});
  const theme = useTheme();

  const getService = async () => {
    const response = await getServicesById(id);
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getService();
  }, [id]);

  return (
    <Card
      sx={{
        width: "100%",
        border: "1px solid black",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          height="140"
          sx={{
            objectFit: "cover",
            maxHeight: "140px",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
            ml: ".5em",
            width: "8em",
            height: "5em",
            objectFit: "contain",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          src={data.Service_images ? data.Service_images[0].address : ""}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexFlow: "row",
          width: "100%",
          height: "100%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            cursor: "pointer",
            height: "100%",
            transition: "transform 0.3s",
            gap: ".5em",
            "&:hover": {
              transform: "scale(1.01)",
            },
          }}
        >
          {data.product_model && (
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
              }}
            >
              {data.product_model}
            </Typography>
          )}
          {data.product_income_date && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: ".8em",
                },
              }}
            >
              Fecha de ingreso: {data.product_income_date}
            </Typography>
          )}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#000" }}
          >
            Técnico: {data.technicianId}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#000" }}
          >
            Diagnóstico del usuario: {data.user_diagnosis}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#000" }}
          >
            Diagnóstico del técnico: {data.technical_diagnosis}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#000" }}
          >
            Diagnóstico final: {data.final_diagnosis}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#000" }}
          >
            Estado de la reparación: {data.status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailProductService;
