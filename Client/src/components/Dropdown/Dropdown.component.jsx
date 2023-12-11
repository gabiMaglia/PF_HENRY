//HOOKS
import { useState } from "react";
//MATERIAL UI
import { Typography, Box, Collapse, Paper } from "@mui/material";
import { ArrowRight, ArrowDropDown } from "@mui/icons-material";
//UTILS
import { itemsQuestions } from "../../utils/objectsTexts";

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

const Dropdown = () => {
  //ESTADOS
  const [openIndex, setOpenIndex] = useState(null);
  
  //HANDLES
  const handleItemClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* BOX TITULO */}
      <Box
        sx={{
          backgroundColor: "#000",
          width: "100%",
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#fff", textTransform: "uppercase", fontWeight: "800" }}
        >
          Preguntas Frecuentes
        </Typography>
      </Box>
      {/* CIERRE BOX TITULO */}

      {/* BOX DROPDOWN */}
      <Box sx={{ padding: "100px" }}>
        {itemsQuestions.map((item, index) => (
          <Paper
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "50vw",
              margin: "15px auto",
              cursor: "pointer",
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

export default Dropdown;
