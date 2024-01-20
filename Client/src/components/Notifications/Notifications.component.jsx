import { useState, useEffect } from "react";
import {
  Box,
  Popper,
  Fade,
  Typography,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getOffers } from "../../services/wishListServices";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";

const Notification = () => {
  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const wishListCards = useSelector((state) => state.wishlist.products);
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
 

  const getAllOffers = () => {
    if (wishListCards?.length > 0) {
      const offers = wishListCards.filter((product) => {
        if (product.carousel) {
          return product;
        }
      });
      setOffers(offers);
    }
  };

  const getAllOffersBack = async () => {
    if (wishListCards?.length > 0) {
      const response = await getOffers(cookieStatus);
      if (!response?.error) {
        setOffers(response);
      }
    }
  };

  const handleClick = (event, close) => {
    !close && setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  useEffect(() => {
    getAllOffers();
  }, [wishListCards]);

  useEffect(() => {
    getAllOffersBack();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        ml: "2em",
        cursor: "pointer",
      }}
    >
      <NotificationsIcon
        onClick={handleClick}
        sx={{ fontSize: "32px", marginLeft: "-15px" }}
      />
      {offers?.length > 0 && (
        <span
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            transform: "translate(50%, -50%)",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "0.2em 0.5em",
            fontSize: "0.7em",
          }}
        >
          {offers?.length}
        </span>
      )}
      <Popper
        sx={{ zIndex: "9999" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                position: "relative",
                mt: 1,
                border: 1,
                borderRadius: "10px",
                p: 3,
                backgroundColor: "white",
              }}
            >
              <CloseIcon
                sx={{
                  color: "black",
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  handleClick(e, true);
                }}
              />
              <Divider
                sx={{
                  mb: ".5em",
                  color: "#fd611a",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="h6">Notificaciones</Typography>
              </Divider>
              {offers?.length <= 0 ? (
                <Box>
                  <Typography>Aun no hay notificaciones</Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  <Typography>
                    Hay productos de tu lista de deseos en oferta
                  </Typography>
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "1em",
                      width: "100%",
                    }}
                  >
                    {offers?.map((offer, key) => {
                      return (
                        <Link
                          to={`/product/${offer.id}`}
                          style={{ textDecoration: "none", color: "black" }}
                          key={key}
                        >
                          <ListItem
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid black",
                              borderRadius: "10px",
                              textAlign: "center",
                              backgroundColor: "#fd621aee",
                            }}
                          >
                            <Typography sx={{ maxWidth: "70%" }}>
                              {offer.name}
                            </Typography>
                            <Typography
                              sx={{ flexGrow: "1", textAlign: "end" }}
                            >
                              {`$${offer.price
                                .toFixed(0)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                            </Typography>
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </Box>
              )}
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;
