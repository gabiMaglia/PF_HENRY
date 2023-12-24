//SWEET ALERT
import Swal from "sweetalert2";

const SessionAlertLogin = () => {
  Swal.fire({
    icon: "info",
    title: "Acceso Privado",
    text: "Debes estar logueado para acceder.",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Ok",
  });
};

const SessionAlertRole = () => {
  Swal.fire({
    icon: "info",
    title: "Acceso Privado",
    text: "No tienes permisos para acceder.",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Ok",
  });
};

export { SessionAlertLogin, SessionAlertRole };