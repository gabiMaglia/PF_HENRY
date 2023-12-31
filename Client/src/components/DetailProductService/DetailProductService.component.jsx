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

  // Renderizar los datos recibidos del backend
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        sx={{ objectFit: "cover" }}
        // Asignar la imagen del servicio (ajustar según la estructura real)
        src={data.Service_images ? data.Service_images[0].address : ""}
      />
      <CardContent sx={{ backgroundColor: "#fd611a" }}>
        <Typography variant="h5" component="div" sx={{ color: "#000" }}>
          {data.product_model}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.9rem", color: "#000" }}
        >
          Fecha de ingreso: {data.product_income_date}
        </Typography>
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
          Estado de la reparación: {/* Ajustar según la estructura real */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailProductService;
