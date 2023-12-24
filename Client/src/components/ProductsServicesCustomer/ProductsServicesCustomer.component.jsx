//MATERIAL UI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const globalProducts = [
  {
    id: 1,
    name: "Producto 1",
    image: "url_de_la_imagen_1",
    budget: "enviado",
    state: "Producto en revisión",
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
    state: "Producto en revisión",
  },
];

const ProductsServicesCustomerComponent = () => {
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
            <Typography
              variant="body2"
              color="text.secondary"
              style={{
                padding: "8px",
                textAlign: "center",
                background: "#f0f0f0",
              }}
            ></Typography>
            <CardMedia
              component="img"
              height="140"
              width="100"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                style={{ height: "100%" }}
              >
                <Box>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ color: "#fd611a", textTransform: "uppercase" }}
                  >
                    PRESUPUESTO : {product.budget}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {product.state} {/* estado del producto */}
                  </Typography>
                </Box>
                <Box
                  mt={1}
                  width="100%"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box mb={1}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#fd611a",
                        color: "white",
                        marginRight: "8px",
                      }}
                    >
                      DETALLE SERVICIO
                    </Button>
                  </Box>
                  <Box mb={1}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "grey",
                        color: "white",
                        marginRight: "8px",
                      }}
                    >
                      ACEPTAR
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      RECHAZAR
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsServicesCustomerComponent;
