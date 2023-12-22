import { CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

const EcommerceCard = ({ products }) => {
  return (
    <Grid container sparcing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              width="100"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body6" color="text.secondary">
                ${product.budget} {/*presupuesto */}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {product.state} {/* estado del producto */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EcommerceCard;
