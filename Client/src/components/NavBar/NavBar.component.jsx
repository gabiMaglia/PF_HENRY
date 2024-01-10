//HOOKS
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
//MATERIAL UI
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
//HELPERS
import PATHROUTE from "../../helpers/pathRoute";

const NavBar = () => {
  const navPages = [
    { text: "INICIO", link: PATHROUTE.HOME },
    { text: "PRODUCTOS", link: PATHROUTE.PRODUCTS },
    { text: "SOPORTE", link: PATHROUTE.SUPPORT },
    { text: "PREGUNTAS FRECUENTES", link: PATHROUTE.QUESTIONS },
    { text: "SOBRE NOSOTROS", link: PATHROUTE.REVIEW },
  ];

  const { pathname } = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: 45,
      }}
    >
      <Toolbar disableGutters sx={{ backgroundColor: "#fd611a" }}>
        <Box
          sx={{
            flexGrow: 1,
            display: { sm: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
            PaperProps={{
              sx: {
                width: "100%",
              },
            }}
          >
            {navPages.map((item, i) => (
              <MenuItem key={i} onClick={handleCloseNavMenu}>
                <Link
                  to={item.link}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography variant="h6">{item.text}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "space-evenly",
            height: 40,
          }}
        >
          {navPages.map((item, i) => (
            <Link key={i} to={item.link} style={{ textDecoration: "none" }}>
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                variant="h6"
                sx={{
                  height: 10,
                  my: 2,
                  color: pathname === item.link ? "white" : "black",
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                {item.text}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
