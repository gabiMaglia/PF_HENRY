const userLoginValidate = (values, setErrors) => {
  const errors = {
    email: "",
    password: [],
  };
  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email no es válido";
  }
  if (!values.password) {
    errors.password.push("La contraseña es requerida");
  } else {
    values.password.length < 8 &&
      errors.password.push("La contraseña debe tener al menos 8 caracteres");
    values.password.length > 16 &&
      errors.password.push(
        "La contraseña no puede contener mas de 16 caracteres"
      );
  }
  setErrors(errors);
};

export default userLoginValidate;
