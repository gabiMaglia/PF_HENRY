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

const UserProfileProductCard = ({
  actionParam = () => {}, // Si no llega una funcion establece una por defecto
  product,
  buttons,
  handleCardClick = () => {}, // Si no llega una funcion establece una por defecto
}) => {
  const theme = useTheme();

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
      <CardMedia
        component="img"
        alt={product.name}
        image={product.image}
        onClick={() => {
          handleCardClick(product.id);
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
          onClick={() => {
            handleCardClick(product.id);
          }}
          sx={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.01)",
            },
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
            {product.budget}
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
                    fontSize: ".8em",
                    maxHeight: "3em",
                    textSizeAdjust: "50%",
                  }}
                  onClick={() => {
                    button.action(actionParam);
                  }}
                >
                  {button.text}
                </Button>
              );
            })}
          </Box>
        </Hidden>
      </CardContent>
    </Box>
  );
};

export default UserProfileProductCard;
