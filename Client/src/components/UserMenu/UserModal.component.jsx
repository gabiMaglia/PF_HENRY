import { Modal, Box } from "@mui/material";

const UserMenu = () => {
  // Estilos del contenedor principal
  const boxModalStyle = {
    position: "absolute",
    top: "20%",
    left: "85%",
    transform: "translate(-50%, -50%)",
    width: "10%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: "1em",
  };

  return (
    <Modal
      open={true}
      BackdropProps={{ invisible: true }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxModalStyle}>PanelModal</Box>
    </Modal>
  );
};

export default UserMenu;
