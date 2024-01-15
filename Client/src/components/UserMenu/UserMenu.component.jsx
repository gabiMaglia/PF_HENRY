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
import UserPanelItems from "../../utils/UserPanelItems.jsx";
//REDUX
import { logoutUser } from "../../redux/slices/userSlice.js";
import {
  clearPersistanceData,
  getDataFromSelectedPersistanceMethod,
} from "../../utils/authMethodSpliter.js";
import { logOutUser } from "../../services/authServices.js";
import { resetCart } from "../../redux/slices/cartSlice.js";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookieStatus = useSelector((state) => state.cookies.cookiesAccepted);
  const authData = getDataFromSelectedPersistanceMethod(cookieStatus);
  const { name, surname } = useSelector((state) => state.user);

  const initialLetersUsers = {
    name: getFirstLetters(name?.split(" ")[0]),
    surname: getFirstLetters(surname?.split(" ")[0]),
  };

  const items = UserPanelItems(name, surname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    clearPersistanceData(cookieStatus);
    await logOutUser(authData.jwt);
    dispatch(logoutUser());
    window.localStorage.setItem("storedProducts", JSON.stringify([]));
    navigate(PATHROUTES.HOME);
    dispatch(resetCart());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
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
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              [`@media (max-width:1200px)`]: {
                flexDirection: "row-reverse",
                gap: "10px",
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
              {name?.split(" ")[0]} <br /> {surname?.split(" ")[0]}
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
            overflow: "scroll",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0,
            width: "12em",
            maxHeight: "70vh",
            mr: "0em",
            pr: 0,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              flexDirection: "column",
              position: "absolute",
              top: 10,
              right: 60,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 10,
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
