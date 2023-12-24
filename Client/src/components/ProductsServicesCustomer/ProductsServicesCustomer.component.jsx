//MATERIAL UI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Hidden,
  Typography,
} from "@mui/material";
import useTheme from "@mui/system/useTheme";

const product = {
  id: 1,
  name: "Monitor Samsung 15 pulgadas",
  image: "https://www.lg.com/ar/images/monitores/md07556921/gallery/Dm-01.jpg",
  budget: "enviado",
  state: "Producto en revisión",
};

const ProductsServicesCustomerComponent = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: "100%",
        maxHeight: "10em",
        [theme.breakpoints.down("sm")]: {
          maxHeight: "7em",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            ml: ".5em",
            width: "8em",
            [theme.breakpoints.down("sm")]: {
              width: "5em",
            },
          }}
        />

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
              height: "90%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                [theme.breakpoints.down("sm")]: {
                  fontSize: ".8em",
                },
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{
                color: "#fd611a",
                textTransform: "uppercase",
              }}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: ".7em",
                },
              }}
            >
              PRESUPUESTO : {product.budget}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: ".8em",
                },
              }}
            >
              {product.state}
            </Typography>
          </Box>
          <Hidden mdDown>
            <Box
              sx={{
                width: "10em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: ".7em",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#fd611a",
                  color: "white",
                }}
                sx={{ width: "12em", fontSize: ".8em" }}
              >
                DETALLE SERVICIO
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "grey",
                  color: "white",
                }}
                sx={{ width: "12em", fontSize: ".8em" }}
              >
                ACEPTAR
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                sx={{ width: "12em", fontSize: ".8em" }}
              >
                RECHAZAR
              </Button>
            </Box>
          </Hidden>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductsServicesCustomerComponent;
