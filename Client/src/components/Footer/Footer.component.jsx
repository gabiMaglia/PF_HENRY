//HOOKS
import { Link } from "react-router-dom";
//MATERIAL UI
import { Container, Typography, Box } from "@mui/material";
import { Copyright } from "@mui/icons-material";
//HELPERS
import { sectionInformation, sectionSocial } from "../../utils/objectsTexts";

const FooterComponent = () => {
  const handleImageTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* BOX FOOTER */}
      <Box
        sx={{
          backgroundColor: "#000",
          "@media (max-width: 480px)": { marginTop: "-100px" },
        }}
      >
        {/* BOX SECCIONES */}
        <Box
          sx={{
            width: "80%",
            margin: "auto",
            display: "flex",
            "@media (max-width: 1140px)": {
              width: "100%",
              padding: "0 30px",
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
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "25px",
                  color: "#fff",
                  "@media (max-width: 768px)": {
                    transform: "scale(.9)",
                  },
                  maxWidth: "100%",
           
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "800",
                    marginBottom: "25px",
                    textAlign: "left",
                  }}
                >
                  {section.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".7rem",
                  }}
                >
                  {section.items.map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      {item.icon && (
                        <item.icon
                          sx={{ color: "#fd611a", marginRight: "10px" }}
                        />
                      )}
                      <Link
                        to={item.link}
                        target={item.target}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography sx={{ color: "#fff" }} variant="body1">
                          {item.text}
                        </Typography>
                      </Link>
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

          {/* SECCION REDES */}
          {sectionSocial.map((section, index) => (
            <Container key={index}>
              <Box
                sx={{
                  marginInline: { xs: "auto", sm: "none" },
                  maxWidth: "100%",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "25px",
                  color: "#fff",
                  "@media (max-width: 768px)": {
                    transform: "scale(.9)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "800",
                    marginBottom: "25px",

                    textAlign: { xxs: "start", sm: "end" },
                  }}
                >
                  {section.title}
                </Typography>
                {section.items.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",

                      justifyContent: "flex-start",

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
                        variant="body1"
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
          {/* CIERRE SECCION REDES */}
        </Box>
        {/* CIERRE BOX SECCIONES */}

        {/* BOX COPYRIGHT */}
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xxs: "column", sm: "row" },
              gap: ".3rem",
              justifyContent: "center",
              textAlign: "center",
              padding: "25px",
            }}
          >
            <Copyright
              sx={{
                alignSelf: "center",
                color: "#fd611a",
                marginRight: "10px",
                "@media(max-width: 480px)": { margin: "0 -10px 0 25px" },
              }}
            />
            <Typography
              variant="body2"
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
