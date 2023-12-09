// Validación de email
const emailValidate = (email) => {
  const emailError = "";
  if (!values.email) {
    emailError = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    emailError = "El email no es válido";
  }
  return emailError;
};

//Validacion de contraseña
const passwordValidate = (password) => {
  const passwordErrors = [];
  if (!values.password) {
    passwordError = "La contraseña es requerida";
  }
  return passwordError;
};

// Validacion de confirmacion de contraseña
const confirmPasswordValidate = (password, confirmPassword) => {
  const confirmPasswordError = "";
  if (!values.confirmPassword) {
    confirmPasswordError = "La confirmación de contraseña es requerida";
  } else if (values.confirmPassword !== values.password) {
    confirmPasswordError = "Las contraseñas no coinciden";
  }
  return confirmPasswordError;
};

// Validacion de información de usuario para inicio de sesion
export const userLoginValidate = (values, setErrors) => {
  const errors = {
    email: "",
    password: "",
  };

  errors.email = emailValidate(values.email);

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }

  setErrors(errors);
};

// Validación de información de usuario para registro
export const userRegisterValidate = (values, setErrors) => {
  const errors = {
    email: "",
    password: [],
    confirmPassword: "",
  };

  errors.email = emailValidate(values.email);

  errors.password = passwordValidate(values.password);

  errors.confirmPassword = confirmPasswordValidate(
    values.password,
    values.confirmPassword
  );

  setErrors(errors);
};
