import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getOffers } from "../../services/wishListServices";
import { useSelector } from "react-redux";
import { getDataFromSelectedPersistanceMethod } from "../../utils/authMethodSpliter";

const Notification = () => {
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const [offers, setOffers] = useState([]);

  const getAllOffers = async () => {
    const response = await getOffers();
    console.log(response);
    setOffers(response);
  };

  useEffect(() => {
    getAllOffers();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        ml: "2em",
      }}
    >
      <NotificationsIcon fontSize="medium" />
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
        1
      </span>
    </Box>
  );
};

export default Notification;
