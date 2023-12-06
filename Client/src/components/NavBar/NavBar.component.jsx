import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import PATHROUTE from "../../helpers/pathRoute";

const NavBar = () => {
  const navPages = [
    { text: "INICIO", link: PATHROUTE.HOME },
    { text: "PRODUCTOS", link: PATHROUTE.PRODUCTS },
    { text: "SOPORTE", link: PATHROUTE.SUPPORT },
    { text: "PREGUNTAS FRECUENTES", link: PATHROUTE.QUESTIONS },
  ];

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
        backgroundColor: "#fd611a",
      }}
    >
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { sm: "flex", md: "none" } }}>
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
          >
            {navPages.map((item, i) => (
              <MenuItem key={i} onClick={handleCloseNavMenu}>
                <Link to={item.link} style={{ textDecoration: "none" }}>
                  <Typography textAlign="center">{item.text}</Typography>
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
          }}
        >
          {navPages.map((item, i) => (
            <Link key={i} to={item.link} style={{ textDecoration: "none" }}>
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: 20,
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
