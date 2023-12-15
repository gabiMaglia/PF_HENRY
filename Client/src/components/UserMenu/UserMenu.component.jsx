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
import { useState } from "react";
import { Link } from "react-router-dom";
import PATHROUTES from "../../helpers/pathRoute";
import { removeAuthDataCookie } from "../../utils/cookiesFunctions";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
            <Avatar sx={{ width: 32, height: 32, backgroundColor: "#fd611a" }}>
              M
            </Avatar>
            <Typography sx={{ maxWidth: "8em", textAlign: "center" }}>
              Martín <br /> Galiotti Martinez
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
              right: 60,
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
          to={PATHROUTES.PROFILE}
        >
          <MenuItem
            onClick={handleClose}
            sx={{ justifyContent: "space-evenly", textAlign: "center" }}
          >
            <Avatar sx={{ backgroundColor: "#fd611a" }}>M</Avatar>
            <Typography>
              Mi <br />
              cuenta
            </Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={PATHROUTES.SHOPINGS}
        >
          <MenuItem
            sx={{ justifyContent: "space-evenly", textAlign: "center" }}
            onClick={handleClose}
          >
            <ListItemIcon>
              <LocalShipping sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography>
              Mis
              <br /> compras
            </Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={PATHROUTES.WISHLIST}
        >
          <MenuItem
            sx={{ justifyContent: "space-evenly", textAlign: "center" }}
            onClick={handleClose}
          >
            <ListItemIcon>
              <Bookmark sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography>
              Lista de <br /> deseos
            </Typography>
          </MenuItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={PATHROUTES.PRODUCTSERVIS}
        >
          <MenuItem
            sx={{ textAlign: "center", justifyContent: "space-evenly" }}
            onClick={handleClose}
          >
            <ListItemIcon>
              <HomeRepairService sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography>
              Productos <br />
              en servicio
            </Typography>
          </MenuItem>
        </Link>
        <Divider />

        <MenuItem
          sx={{ justifyContent: "space-evenly", textAlign: "center" }}
          onClick={() => {
            removeAuthDataCookie();
            window.location.reload();
          }}
        >
          <ListItemIcon>
            <Logout sx={{ color: "black" }} />
          </ListItemIcon>
          <Typography>
            Cerrar <br />
            sesión
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
