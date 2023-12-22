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
import {
  Logout,
  LocalShipping,
  Bookmark,
  HomeRepairService,
} from "@mui/icons-material";
//HELPERS
import PATHROUTES from "../../helpers/pathRoute";
import getFirstLetters from "../../helpers/getFirstLetters";
//UTILS
import { removeAuthDataCookie } from "../../utils/cookiesFunctions";
//REDUX
import { logoutUser } from "../../redux/slices/UserSlice";

const UserMenu = () => {
  const navigate = useNavigate();
  const { name, surname } = useSelector((state) => state.user);
  const initialLetersUsers = {
    name: getFirstLetters(name),
    surname: getFirstLetters(surname),
  };
  const dispatch = useDispatch();

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
            width: "14em",
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
              right: 25,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              justifyContent: "center",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={PATHROUTES.USERPANEL + PATHROUTES.PROFILE}
        >
          <MenuItem
            onClick={handleClose}
            sx={{ justifyContent: "center", textAlign: "center" }}
          >
            <Avatar sx={{ backgroundColor: "#fd611a" }}>
              <Typography variant="caption">
                {initialLetersUsers.name + initialLetersUsers.surname}
              </Typography>
            </Avatar>
            <Typography sx={{ width: "6em" }}>
              Mi <br />
              cuenta
            </Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={PATHROUTES.USERPANEL + PATHROUTES.SHOPINGS}
        >
          <MenuItem
            sx={{ justifyContent: "center", textAlign: "center" }}
            onClick={handleClose}
          >
            <ListItemIcon>
              <LocalShipping sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography sx={{ width: "6em" }}>
              Mis
              <br /> compras
            </Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={PATHROUTES.USERPANEL + PATHROUTES.WISHLIST}
        >
          <MenuItem
            sx={{ justifyContent: "center", textAlign: "center" }}
            onClick={handleClose}
          >
            <ListItemIcon>
              <Bookmark sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography sx={{ width: "6em" }}>
              Lista de <br /> deseos
            </Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={PATHROUTES.USERPANEL + PATHROUTES.PRODUCTSERVICES}
        >
          <MenuItem
            sx={{
              textAlign: "center",
              justifyContent: "center",
            }}
            onClick={handleClose}
          >
            <ListItemIcon>
              <HomeRepairService sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography sx={{ width: "6em" }}>
              Productos <br />
              en servicio
            </Typography>
          </MenuItem>
        </Link>
        <Divider />

        <MenuItem
          sx={{ justifyContent: "center", textAlign: "center" }}
          onClick={logout}
        >
          <ListItemIcon>
            <Logout sx={{ color: "black" }} />
          </ListItemIcon>
          <Typography sx={{ width: "6em" }}>
            Cerrar <br />
            sesión
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
