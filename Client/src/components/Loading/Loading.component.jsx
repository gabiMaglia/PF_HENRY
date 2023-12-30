import { CircularProgress, Container, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Container
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0",
        left: "0",
        display: "flex",
        backgroundColor: "white",
        zIndex: "100",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5,
          color: "#fd611a",
        }}
      />
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Cargando...
      </Typography>
    </Container>
  );
};

export default Loading;
