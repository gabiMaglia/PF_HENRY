//HOOKS
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//MATERIAL UI
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
import getFirstLetters from "../../helpers/getFirstLetters";
//UTILS
import { removeAuthDataCookie } from "../../utils/cookiesFunctions";
import userPanelItems from "../../utils/userPanelItems.jsx";
//REDUX
import { logoutUser } from "../../redux/slices/UserSlice";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, surname } = useSelector((state) => state.user);
  const initialLetersUsers = {
    name: getFirstLetters(name),
    surname: getFirstLetters(surname),
  };

  const items = userPanelItems(name, surname);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    removeAuthDataCookie("authData");
    removeAuthDataCookie("jwt");
    navigate(PATHROUTES.HOME);
    dispatch(logoutUser());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mr: "1em" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Panel de usuario">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              [`@media (max-width:1200px)`]: {
                flexDirection: "row-reverse",
                gap: "1em",
              },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 45,
                height: 45,
                backgroundColor: "#fd611a",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {initialLetersUsers.name + initialLetersUsers.surname}
              </Typography>
            </Avatar>
            <Typography sx={{ maxWidth: "8em", textAlign: "center" }}>
              {name} <br /> {surname}
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "12em",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: 0,
              right: 60,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              justifyContent: "center",
              [`@media (max-width:1200px)`]: {
                right: 25,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {items.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={item.name}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem
                onClick={() => {
                  item.action === "logout" && logout();
                  handleClose();
                }}
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "1.5em",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography
                  sx={{
                    width: "5em",
                    whiteSpace: "normal",
                  }}
                >
                  {item.name}
                </Typography>
              </MenuItem>

              {items.length - 1 !== index && <Divider />}
            </Link>
          );
        })}
      </Menu>
    </Box>
  );
};

export default UserMenu;