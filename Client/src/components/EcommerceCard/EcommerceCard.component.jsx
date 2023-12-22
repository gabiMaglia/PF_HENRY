import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const globalProducts = [
  {
    id: 1,
    name: "Producto 1",
    image: "url_de_la_imagen_1",
    budget: "enviado",
    state: "Producto en revision",
  },
  {
    id: 2,
    name: "Producto 2",
    image: "url_de_la_imagen_2",
    budget: "pendiente",
    state: "Listo para retirar del local",
  },
  {
    id: 3,
    name: "Producto 3",
    image: "url_de_la_imagen_3",
    budget: "rechazado",
    state: "Producto en revision",
  },
];

const EcommerceCard = () => {
  // Verificar si globalProducts existe y es un array
  if (
    !globalProducts ||
    !Array.isArray(globalProducts) ||
    globalProducts.length === 0
  ) {
    console.error("No hay productos disponibles.");
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <Grid container spacing={2}>
      {globalProducts.map((product) => (
        <Grid item key={product.id} xs={12}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              width="100"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span style={{ color: "orange", textTransform: "uppercase" }}>
                    <h2>PRESUPUESTO : {product.budget}</h2>
                  </span>
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {product.state} {/* estado del producto */}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EcommerceCard;
