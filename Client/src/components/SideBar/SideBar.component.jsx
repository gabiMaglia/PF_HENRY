//HOOKS
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
//MATERIAL UI
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu, ArrowBack } from "@mui/icons-material";
//UTILS
import UserPanelItems from "../../utils/UserPanelItems.jsx";
//REDUX
import useLogoutUser from "../../Hook/useLogoutUser.jsx";
const SideBar = () => {
  const { name, surname } = useSelector((state) => state.user);
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const items = UserPanelItems(name, surname);
  const logoutUser = useLogoutUser(cookieStatus);
  const actualLocation = useLocation().pathname;
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const sideBarBoxStyle = sideBarIsOpen
    ? {
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        minWidth: "10em",
        maxWidth: "18em",
        width: "25%",
        minHeight: "500px",
        borderRight: ".1px solid grey",
      }
    : {
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        minWidth: "5em",
        maxWidth: "8em",
        width: "5%",
        minHeight: "500px",
        borderRight: ".1px solid grey",
      };

  const handleMenuClick = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  return (
    <Box sx={sideBarBoxStyle}>
      <ListItemButton sx={{ height: "3em" }} onClick={handleMenuClick}>
        {sideBarIsOpen ? <ArrowBack /> : <Menu sx={{ width: "100%" }} />}
      </ListItemButton>
      <Divider />
      <List sx={{ pt: "0px" }}>
        {items.map((item) => (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={item.path}
            key={item.name}
          >
            <ListItemButton
              sx={{
                backgroundColor: actualLocation === item.path ? "#fd611a" : "",
                height: "5em",
                pt: "1em",
                pb: "1em",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                if (item.action === "logout") {
                  logoutUser.logout();
                }
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {sideBarIsOpen ? <ListItemText primary={item.name} /> : null}
              <Divider />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
