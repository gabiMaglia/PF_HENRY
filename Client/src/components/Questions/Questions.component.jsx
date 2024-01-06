import { Typography, Box } from "@mui/material";
import DropdownStoreComponent from "../DropdownStore/DropdownStore.component";
import DropdownStoreService from "../DropdownService/DropdownService.component";

const QuestionsComponent = () => {
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
          sx={{
            color: "#fff",
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
      {/* CIERRE BOX TITULO */}
        <DropdownStoreComponent />
        <DropdownStoreService />
    </>
  );
};

export default QuestionsComponent;
