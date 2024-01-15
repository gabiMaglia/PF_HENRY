import { Box, Button, Divider, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const DetailProductShopping = ({ setOpenDetail, productsDetail }) => {
  const formatPrice = (price) => {
    return "$" + price.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  };
  return (
    <Box
      sx={{
        padding: 2,
        width: "100%",
        height: "auto",
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
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        {productsDetail.products.map((product) => {
          return (
            <Box
              key={product.id}
              sx={{ mb: 5, width: "80%", textAlign: "center" }}
            >
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" sx={{ mt: 2, fontSize: 16 }}>
                Cantidad: {product.count}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 2, color: "#fd611a", fontSize: 16 }}
              >
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
        <Typography
          variant="body2"
          sx={{ fontWeight: 700, fontSize: { md: 18 } }}
        >
          Metodo de pago:
          {productsDetail.paymentMethod == "credit_card"
            ? " Tarjeta de credito"
            : productsDetail.paymentMethod == "ticket"
            ? " Pago facil - Rapipago "
            : productsDetail.paymentMethod == "debit_card"
            ? " Tarjeta de debito"
            : " Efectivo"}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
          Total: {productsDetail.cartTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailProductShopping;
