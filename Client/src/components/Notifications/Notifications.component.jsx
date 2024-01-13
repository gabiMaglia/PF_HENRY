import { Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notification = () => {
  return (
    <Box>
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
