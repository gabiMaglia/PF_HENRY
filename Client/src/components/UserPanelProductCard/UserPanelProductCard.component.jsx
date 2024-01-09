//MATERIAL UI
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Hidden,
  Typography,
} from "@mui/material";
import useTheme from "@mui/system/useTheme";
import { useState } from "react";

const UserPanelProductCard = ({
  product,
  buttons,
  handleCardClick = () => {}, // Si no llega una funcion establece una por defecto
  alternativeImage = "Product Image", // Si no llega una imagen establece una por defecto
  setIsLoading = () => {}, // Si no llega una funcion establece una por defecto
  actionParam = () => {},
}) => {
  const theme = useTheme();
  console.log(product);
  console.log(product.name);

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "10vh",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box>
        <CardMedia
          component="img"
          alt={product.name}
          image={product.ProductImages[0].address}
          onClick={() => {
            handleCardClick(product.id);
          }}
          onLoad={() => {
            setIsLoading(false);
          }}
          sx={{
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
            ml: ".5em",
            width: "8em",
            height: "5em",
            objectFit: "contain",
            [theme.breakpoints.down("sm")]: {
              width: "6em",
              height: "4em",
            },
          }}
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
          {product.name && (
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
          )}
          {product.price && (
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
              ${product.price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Box>
  );
};
{
  /* <Hidden mdDown>
          <Box
            sx={{
              width: "10em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: ".7em",
            }}
          >
            {buttons.map((button) => {
              return (
                <Button
                  key={button.text}
                  variant="contained"
                  style={{
                    backgroundColor: button.color,
                    color: "white",
                  }}
                  sx={{
                    maxWidth: "13em",
                    maxHeight: "3em",
                  }}
                  onClick={() => {
                    button.action(
                      product.id,
                      button.actionParam && button.actionParam,
                      actionParam && actionParam
                    );
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: ".8em",
                      textAlign: "center",
                      textTransform: "uppercase",
                      justifyContent: "center",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                    variant="body2"
                  >
                    {button.text}
                  </Typography>
                </Button>
              );
            })}
          </Box>
        </Hidden> */
}

export default UserPanelProductCard;

// {product.status && (
//   <Typography
//     variant="body2"
//     color="text.primary"
//     sx={{
//       [theme.breakpoints.down("sm")]: {
//         fontSize: ".8em",
//       },
//     }}
//   >
//     {product.status}
//   </Typography>
// )}
