//HOOKS
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { removeAuthDataCookie } from "../../utils/cookiesFunctions";
import UserPanelItems from "../../utils/UserPanelItems.jsx";
//REDUX
import { logoutUser } from "../../redux/slices/userSlice.js";

const SideBar = () => {
  const dispatch = useDispatch();
  const { name, surname } = useSelector((state) => state.user);

  const items = UserPanelItems(name, surname);

  const logout = () => {
    removeAuthDataCookie("authData");
    removeAuthDataCookie("jwt");
    dispatch(logoutUser());
  };

  const actualLocation = useLocation().pathname;

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const sideBarBoxStyle = sideBarIsOpen
    ? {
        minWidth: "10em",
        maxWidth: "18em",
        width: "25%",
        minHeight: "500px",
        borderRight: ".1px solid grey",
      }
    : {
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
                  logout();
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
