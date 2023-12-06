import { Link } from "react-router-dom"
import { Container, Typography, Box } from "@mui/material";
import { AccessTimeFilled, Room, Email, Phone, Copyright, Inventory, SupportAgent, Help, Language } from '@mui/icons-material';

import PATHROUTE from "../../helpers/pathRoute"

const FooterComponents = () => {
  const sectionInformation = [{
    title: "INFORMACION",
    items: [
      { icon: Phone, text: "+54 11 2256-8888" },
      { icon: Room, text: "Calle Falsa 123 - Buenos Aires" },
      { icon: Email, text: "contacto@hypermegared.com.ar" },
      { icon: AccessTimeFilled, text: "Lunes a Viernes: 10 a 14hs y 17 a 20hs | Sábados: 10 a 14hs." },
    ]
  }];

  const sectionPages = [{
    title: "PAGINAS",
    items: [
      { icon: Language, text: "INICIO", link: PATHROUTE.HOME },
      { icon: Inventory, text: "PRODUCTOS", link: PATHROUTE.PRODUCTS },
      { icon: SupportAgent, text: "SOPORTE", link: PATHROUTE.SUPPORT },
      { icon: Help, text: "PREGUNTAS FRECUENTES", link: PATHROUTE.QUESTIONS },
    ]
  }];

  const boxStyle = {
    backgroundColor: "#000",
    width: "100vw",
    height: "300px",
    display: "flex",
    padding: "20px 180px",
  };

  const boxStyleOne = {
    width: "100vw",
    display: "flex",
  };

  const boxStyleTwo = {
    color: "#fff",
    padding: "30px",
  }

  const boxStyleThree = {
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "30px"
  }

  const boxStyleCopyright = {
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    padding: "0 0 30px 0"
  };

  return (
    <>
      <Box style={boxStyle}>
        <Box style={boxStyleOne}>
          {sectionInformation.map((section, index) => (
            <Container key={index}>
              <Box style={boxStyleTwo}>
                <Typography variant="h5" sx={{ fontWeight: "800", marginBottom: "25px" }}>{section.title}</Typography>
                {section.items.map((item, i) => (
                  <Box key={i} sx={{ display: "flex", marginBottom: "10px" }}>
                    {item.icon && <item.icon sx={{ color: "#fd611a", marginRight: "10px" }} />}
                    <Typography>{item.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          ))}
          {sectionPages.map((section, index) => (
            <Container key={index}>
              <Box style={boxStyleThree}>
                <Typography variant="h5" sx={{ fontWeight: "800", marginBottom: "25px" }}>{section.title}</Typography>
                {section.items.map((item, i) => (
                  <Box key={i} sx={{ display: "flex", marginBottom: "10px" }}>
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      <Typography sx={{ marginRight: "10px", color: "#fff" }}>{item.text}</Typography>
                    </Link>
                    {item.icon && <item.icon sx={{ color: "#fd611a" }} />}
                  </Box>
                ))}
              </Box>
            </Container>
          ))}
        </Box>
      </Box>
      <Box style={boxStyleCopyright}>
        <Box sx={{ display: "flex" }}>
          <Copyright sx={{ color: "#fd611a", marginRight: "10px" }} />
          <Typography sx={{ color: "#787373", fontWeight: "500" }}>2023 | Todos los derechos reservados. | Desarrollado por Grupo PF - Henry.</Typography>
        </Box>
      </Box>
    </>
  );
};

export default FooterComponents;
