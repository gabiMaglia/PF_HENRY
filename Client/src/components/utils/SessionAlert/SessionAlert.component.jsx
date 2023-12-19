import Swal from "sweetalert2";

const SessionAlert = () => {
  Swal.fire({
    icon: "info",
    title: "Acceso Privado",
    text: "Debes estar logueado para acceder a esta ruta.",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Ok",
  });
};

export default SessionAlert;