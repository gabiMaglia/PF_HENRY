import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const DetailProductService = ({
  model,
  imageUrl,
  entryDate,
  technicianName,
  userDiagnosis,
  technicianDiagnosis,
  finalDiagnosis,
  repairStatus,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={model}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ backgroundColor: "#fd611a" }}>
        <Typography variant="h5" component="div" sx={{ color: "#000" }}>
          {model}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.9rem", color: "#000" }}
        >
          Fecha de ingreso: {entryDate}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Técnico: {technicianName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Diagnóstico del usuario: {userDiagnosis}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Diagnóstico del técnico: {technicianDiagnosis}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Diagnóstico final: {finalDiagnosis}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#000" }}
        >
          Estado de la reparación: {repairStatus}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailProductService;
