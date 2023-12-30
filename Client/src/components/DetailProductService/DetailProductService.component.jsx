import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getServicesById } from "../../services/serviceServices";

const DetailProductService = ({ id }) => {
  const [data, setData] = useState({});
  const getService = async () => {
    const response = await getServicesById(id);
    console.log(response.data);
    setData(response.data);
  };
  useEffect(() => {
    getService();
  }, [id]);
  return (
    <Card>
      <CardMedia component="img" height="140" sx={{ objectFit: "cover" }} />
      <CardContent sx={{ backgroundColor: "#fd611a" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: "#000" }}
        ></Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.9rem", color: "#000" }}
        >
          Fecha de ingreso:
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Técnico:
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Diagnóstico del usuario:
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Diagnóstico del técnico:
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Diagnóstico final:
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Estado de la reparación:
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailProductService;
