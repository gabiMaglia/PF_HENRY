//HOOKS
import { Link } from "react-router-dom";
//MATERIAL UI
import { Container, Typography, Box } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
//HELPERS
import PATHROUTE from "../../helpers/pathRoute";
import { sectionInformation, sectionPages } from "../../utils/objectsTexts";

const FooterComponents = () => {
  const smallScreen = useMediaQuery("(max-width:850px)");
  const boxStyle = {
    backgroundColor:"#000",
    width: "100%",
    height: smallScreen ? "600px"  : "350px",
    display:  "flex",
    flexDirection:  "column-reverse",
    justifyContent: smallScreen && "space-evenly",
    padding: smallScreen ? "0px" : "20px 180px", 
  }

  const boxStyleOne = {
    width: "100%", // Ajustado para ser siempre 100%
    display: "flex",
    flexDirection: smallScreen ? "column" : "row", 
    justifyContent: "space-between", 
  }
  const boxStyleTwo = {
    color: "#fff",
    padding:smallScreen?"10px":"30px",
  };

  const boxStyleThree = {
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "30px",
  };

  const boxStyleCopyright = {
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    padding: "0 0 30px 0",
    paddingLeft:smallScreen&&"10px"
  };


  return (
    <>
      {/* BOX FOOTER */}
      <Box style={boxStyle}>
        {/* BOX SECCIONES */}
        <Box style={boxStyleOne}>
          {/* SECCION INFORMACION */}
          {sectionInformation.map((section, index) => (
            <Container key={index}>
              <Box style={boxStyleTwo}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight:"800",
                    marginBottom: "25px",
                    
                  }} 
                >
                  {section.title}
                </Typography>
                {section.items.map((item, i) => (
                  <Box key={i} sx={{ display: "flex", marginBottom: "10px" }}>
                    {item.icon && (
                      <item.icon
                        sx={{ color: "#fd611a", marginRight: "10px" }}
                      />
                    )}
                    <Typography>{item.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          ))}
          {/* CIERRE SECCION INFORMACION */}

          {/* SECCION PAGINAS */}
          {sectionPages.map((section, index) => (
            <Container key={index}>
              <Box style={boxStyleThree}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "800",
                    marginBottom: "25px",
                  
                  }} 
                >
                  {section.title}
                </Typography>
                {section.items.map((item, i) => (
                  <Box key={i} sx={{ display: "flex", marginBottom: "10px" }}>
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      <Typography sx={{ marginRight:"10px", color: "#fff", fontSize:smallScreen&&{xs:13}, marginTop:smallScreen&&"5px" }}>
                        {item.text}
                      </Typography>
                    </Link>
                    {item.icon && <item.icon sx={{ color: "#fd611a" }} />}
                  </Box>
                ))}
              </Box>
            </Container>
          ))}
          {/* CIERRE SECCION PAGINAS */}
        </Box>
        {/* CIERRE BOX SECCIONES */}
      </Box>
      {/* CIERRE BOX FOOTER */}

      {/* BOX COPYRIGHT */}
      <Box style={boxStyleCopyright}>
        <Box sx={{ display: "flex" }}>
          <Copyright sx={{ color: "#fd611a", marginRight: "10px" }} />
          <Typography sx={{ color: "#787373", fontWeight: "500" }}>
            2023 | Todos los derechos reservados. | Desarrollado por Grupo 06 PF
            - Henry.
          </Typography>
        </Box>
      </Box>
      {/* CIERRE BOX COPYRIGHT */}
    </>
  );
};
export default FooterComponents;
