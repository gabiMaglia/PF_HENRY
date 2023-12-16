//HOOKS
import { Link } from "react-router-dom";
//MATERIAL UI
import { Container, Typography, Box } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
//HELPERS
import PATHROUTE from "../../helpers/pathRoute";
import { sectionInformation, sectionSocial } from "../../utils/objectsTexts";
import MapContainer from "../Map/Map.component";

const FooterComponent = () => {
  const handleImageTop = ()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {/* BOX FOOTER */}
      <Box sx={{ backgroundColor: "#000" }}>
        {/* BOX SECCIONES */}
        <Box
          sx={{
            width: "80%",
            margin: "auto",
            display: "flex",
            "@media (max-width: 1140px)": {
              width: "100%",
              padding: "0 50px",
            },
            "@media (max-width: 768px)": {
              width: "100%",
              flexDirection: "column",
            },
          }}
        >
          {/* SECCION INFORMACION */}
          {sectionInformation.map((section, index) => (
            <Container key={index}>
              <Box
                sx={{
                  paddingTop: "25px",
                  color: "#fff",
                  "@media (max-width: 768px)": {
                    transform: "scale(.9)",
                  },
                  "@media (max-width: 480px)": {
                    transform: "scale(.8)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "800",
                    marginBottom: "25px",
                  }}
                >
                  {section.title}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {section.items.map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        marginBottom: "10px",
                      }}
                    >
                      {item.icon && (
                        <item.icon
                          sx={{ color: "#fd611a", marginRight: "10px" }}
                        />
                      )}
                      <Typography>{item.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Container>
          ))}
          {/* CIERRE SECCION INFORMACION */}
          {/* LOGO EMPRESA */}
          <Container>
            <Box
              sx={{
                textAlign: "center",
                paddingTop: "50px",
                "@media (max-width: 768px)": { display: "none" },
              }}
            >
              <img
                src="/icons/logo.svg"
                alt="logo hyper mega red"
                style={{ width: "150px", height: "auto", cursor: "pointer" }}
                onClick={handleImageTop}
              />
            </Box>
          </Container>
          {/* CIERRE LOGO EMPRESA */}
          {/* <Container>
            <MapContainer />
          </Container> */}
          {/* SECCION PAGINAS */}
          {sectionSocial.map((section, index) => (
            <Container key={index}>
              <Box
                sx={{
                  paddingTop: "25px",
                  color: "#fff",
                  "@media (max-width: 768px)": {
                    transform: "scale(.9)",
                  },
                  "@media (max-width: 480px)": {
                    transform: "scale(.8)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "800",
                    marginBottom: "25px",
                    textAlign: "end",
                    "@media (max-width: 768px)": {
                      textAlign: "start",
                    },
                  }}
                >
                  {section.title}
                </Typography>
                {section.items.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      flexDirection: "row-reverse",
                      "@media (max-width: 768px)": {
                        flexDirection: "row",
                      },
                    }}
                  >
                    {item.icon && <item.icon sx={{ color: "#fd611a" }} />}
                    <Link to={item.link} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          marginRight: "10px",
                          color: "#fff",
                          "@media (max-width: 768px)": {
                            marginLeft: "10px",
                          },
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Link>
                  </Box>
                ))}
              </Box>
            </Container>
          ))}
          {/* CIERRE SECCION PAGINAS */}
        </Box>
        {/* CIERRE BOX SECCIONES */}

        {/* BOX COPYRIGHT */}
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              padding: "25px",
            }}
          >
            <Copyright
              sx={{
                color: "#fd611a",
                marginRight: "10px",
                "@media(max-width: 480px)": { margin: "0 -10px 0 25px" },
              }}
            />
            <Typography
              sx={{
                color: "#787373",
                fontWeight: "500",
                "@media (max-width: 480px)": { fontSize: "12px" },
              }}
            >
              2023 | Todos los derechos reservados. | Desarrollado por Grupo 06
              PF - Henry.
            </Typography>
          </Box>
        </Box>
        {/* CIERRE BOX COPYRIGHT */}
      </Box>
      {/* CIERRE BOX FOOTER */}
    </>
  );
};
export default FooterComponent;

// import { Box } from "@mui/material";

// const FooterComponent = () => {
//   return (
//     <>
//       {/* BOX GENERAL */}
//       <Box sx={{ backgroundColor: "#000", height: "100px", width: "100%" }}>
//         {/* BOX INFO */}
//         <Box
//           sx={{
//             backgroundColor: "red",
//             height: "80%",
//             width: "80%",
//             margin: "auto",
//           }}
//         >
//           <Box></Box>
//           <Box></Box>
//           <Box></Box>
//         </Box>
//         {/* CIERRE BOX INFO */}
//         {/* BOX COPYRIGHT */}
//         <Box
//           sx={{
//             backgroundColor: "green",
//             height: "80%",
//             width: "80%",
//             margin: "auto",
//           }}
//         >
//           <Box></Box>
//           <Box></Box>
//         </Box>
//         {/* CIERRE BOX COPYRIGHT */}
//       </Box>
//       {/* CIERRE BOX GENERAL */}
//     </>
//   );
// };

// export default FooterComponent;
