//HOOKS
import { useState } from "react";
//MATERIAL UI
import { Typography, Box, Collapse, Paper } from "@mui/material";
import { ArrowRight, ArrowDropDown } from "@mui/icons-material";
//UTILS
import { questionsStore } from "../../utils/objectsTexts";

const DropdownItem = ({ title, content }) => (
  <Box sx={{ paddingBottom: "25px", paddingTop: "10px" }}>
    <Typography>{title}</Typography>
    {content.map((paragraph, index) => (
      <Box key={index} sx={{ padding: "10px", margin: "0 20px" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
          {/* {paragraph} */}
          <span dangerouslySetInnerHTML={{ __html: paragraph }} />
        </Typography>
      </Box>
    ))}
  </Box>
);

const DropdownStoreComponent = () => {
  //ESTADOS
  const [openIndex, setOpenIndex] = useState(null);

  //HANDLES
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "25px", fontWeight: "800" }}
        >
          Tienda Online
        </Typography>
      </Box>
      {/* BOX DROPDOWN */}
      <Box
        sx={{
          padding: "10px 50px",
          "@media (max-width: 768px)": {
            padding: "50px 0px",
          },
          "@media (max-width: 480px)": {
            padding: "50px",
            marginBottom: "100px",
          },
        }}
      >
        {questionsStore.map((item, index) => (
          <Paper
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              margin: "15px auto",
              cursor: "pointer",
              "@media (max-width: 768px)": {
                width: "75%",
              },
              "@media (max-width: 480px)": {
                width: "100%",
              },
            }}
          >
            <Typography
              variant="h6"
              onClick={() => handleItemClick(index)}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                fontWeight: "800",
                textTransform: "uppercase",
                "&:hover": { color: "#fd611a" },
                color: openIndex === index ? "#fd611a" : "",
              }}
            >
              {openIndex === index ? <ArrowDropDown /> : <ArrowRight />}{" "}
              {item.title}
            </Typography>
            <Collapse in={openIndex === index}>
              <DropdownItem content={item.content} />
            </Collapse>
          </Paper>
        ))}
      </Box>
      {/* CIERRE BOX DROPDOWN */}
    </>
  );
};

export default DropdownStoreComponent;
