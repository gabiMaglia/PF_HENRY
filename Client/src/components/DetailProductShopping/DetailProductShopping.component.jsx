import { Box, Button, Divider, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const DetailProductShopping = ({ setOpenDetail, productsDetail }) => {
  const formatPrice = (price) => {
    return "$" + price.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  };
  return (
    <Box
      sx={{
        zIndex: "10",
        width: "100%",
        height: "auto",
        pb: "1.2em",
        mb: "1.2em",
        backgroundColor: "white",
        position: "absolute",
        border: "solid 1px",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fd611a",
          borderRadius: "10px",
          textAlign: "center",
          position: "absolute",
          top: 10,
          left: 10,
          display: "flex",
          alignItems: "center",
          pr: "3px",
          pl: "3px",
        }}
      >
        <Button
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(249, 112, 49, 0.9)" },
          }}
          onClick={() => {
            setOpenDetail(false);
          }}
        >
          <ArrowBackIosIcon sx={{ color: "white", height: "70%" }} />
          Volver
        </Button>
      </Box>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {productsDetail.products.map((product) => {
          return (
            <Box
              key={product.id}
              sx={{ mb: 5, width: "80%", textAlign: "center" }}
            >
              <Typography variant="h5">
                Nombre de producto: {product.name}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Cantidad: {product.count}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Precio por unidad: {formatPrice(product.budget)}
              </Typography>
              <Divider
                sx={{
                  color: "black",
                  widows: "100%",
                  mt: 2,
                  height: "2px",
                  backgroundColor: "black",
                }}
              />
            </Box>
          );
        })}
        <Typography variant="h5">
          Metodo de pago:
          {productsDetail.paymentMethod == "credit_card"
            ? " Tarjeta de credito"
            : " Efectivo"}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Total: {productsDetail.cartTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailProductShopping;
