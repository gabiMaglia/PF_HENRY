import { Typography, Box } from "@mui/material";
import DropdownStoreComponent from "../DropdownStore/DropdownStore.component";
import DropdownStoreService from "../DropdownService/DropdownService.component";

const QuestionsComponent = () => {
  return (
    <>
      <Box sx={{ minHeight: "70vh", marginBottom: "25px" }}>
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
            sx={{
              margin: "10px",
              color: "#fff",
              textAlign: "center",
              fontSize: "1.7rem",
              textTransform: "uppercase",
              fontWeight: "800",
              "@media (max-width: 480px)": {
                transform: "scale(.8)",
              },
            }}
          >
            Preguntas Frecuentes
          </Typography>
        </Box>
        <DropdownStoreComponent />
        <DropdownStoreService />
      </Box>
    </>
  );
};

export default QuestionsComponent;
