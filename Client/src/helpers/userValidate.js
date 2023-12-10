const constsUserValidations = {
  regexEmail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  minCantCharUsername: 3,
  maxCantCharUsername: 20,
  minCantCharAddress: 8,
  maxCantCharAddress: 20,
  regexContainNumber: /\d/,
  regexContainUpperCase: /[A-Z]/,
  regexContainLowerCase: /[a-z]/,
  regexContainSpaces: /\s/,
  regexContainSpecialCharacters: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  regexPhoneNumberAreaCode: /^\d{3,5}$/,
  regexPhoneNumber: /^\d{5,7}$/,
  minCantCharName: 3,
  maxCantCharName: 20,
  minCantCharLastName: 3,
  maxCantCharLastName: 20,
  regexDni: /^[1-9]\d{6,7}$/,
};

// Validación de email
const emailValidate = (email) => {
  const { regexEmail } = constsUserValidations;
  let emailError = "";
  if (!email) {
    emailError = "El email es requerido";
  } else if (!regexEmail.test(email)) {
    emailError = "El email no es válido";
  }
  return emailError;
};

//Validacion de contraseña
const addressValidate = (password) => {
  const {
    minCantCharAddress,
    maxCantCharAddress,
    regexContainNumber,
    regexContainUpperCase,
    regexContainLowerCase,
    regexContainSpaces,
  } = constsUserValidations;

  const addressErrors = [];
  if (!address) {
    addressError.push("La contraseña es requerida");
  } else {
    address.length < minCantCharAddress &&
      addressErrors.push(
        `La contraseña debe contener al menos ${minCantCharAddress} caracteres`
      );
    address.length > maxCantCharAddress &&
      addressErrors.push(
        `La contraseña debe contener máximo ${maxCantCharAddress} caracteres`
      );
    regexContainNumber.test(address) &&
      addressErrors.push("La contaseña debe contener al menos un número");
  }
  regexContainUpperCase.test(address) &&
    addressErrors.push(
      "La contraseña debe contener al menos una letra mayúscula"
    );
  regexContainLowerCase.test(address) &&
    addressErrors.push(
      "La contraseña debe contener al menos una letra minúscula"
    );
  regexContainSpaces.test(address) &&
    addressErrors.push("La contraseña no debe contener espacios");
  return addressError;
};

// Validacion de confirmacion de contraseña
const confirmAddressValidate = (address, confirmAddress) => {
  let confirmAddressError = "";
  if (!confirmAddress) {
    confirmAddressError = "La confirmación de contraseña es requerida";
  } else if (confirmPassword !== address) {
    confirmAddressError = "Las contraseñas no coinciden";
  }
  return confirmAddressError;
};

// Validacion de nombre de usuario
const usernameValidate = (username) => {
  const { regexContainSpaces } = constsUserValidations;
  let usernameError = "";
  if (!username) {
    usernameError = "El nombre de usuario es requerido";
  } else if (username.length < minCantCharUsername) {
    usernameError = `El nombre de usuario debe contener al menos ${minCantCharUsername} caracteres`;
  } else if (username.length > maxCantCharUsername) {
    usernameError = `El nombre de usuario debe contener máximo ${maxCantCharUsername} caracteres`;
  } else {
    regexContainSpaces.test(username) &&
      (usernameError = "El nombre de usuario no puede contener espacios");
  }
  return usernameError;
};

const phoneNumberAreaCodeValidate = (phoneNumberAreaCode) => {
  const {
    regexPhoneNumberAreaCode,
    regexContainSpaces,
    regexContainSpecialCharacters,
  } = constsUserValidations;
  let phoneNumberAreaCodeError = [];
  if (!phoneNumberAreaCode) {
    phoneNumberAreaCodeError.push("El codigo de area es requerido");
  } else {
    regexPhoneNumberAreaCode.test(phoneNumberAreaCode) &&
      phoneNumberAreaCodeError.push("El codigo de area no es valido");
    regexContainSpaces.test(phoneNumberAreaCode) &&
      phoneNumberAreaCodeError.push(
        "El codigo de area no puede contener espacios"
      );
    regexContainSpecialCharacters.test(phoneNumberAreaCode) &&
      phoneNumberAreaCodeError.push(
        "El codigo de area no puede contener caracteres especiales"
      );
  }
  return phoneNumberAreaCodeError;
};

const phoneNumberValidate = (phoneNumber) => {
  const {
    regexPhoneNumber,
    regexContainSpaces,
    regexContainSpecialCharacters,
  } = constsUserValidations;
  let phoneNumberError = [];
  if (!phoneNumber) {
    phoneNumberError.push("El numero de telefono es requerido");
  } else {
    regexPhoneNumber.test(phoneNumber) &&
      phoneNumberError.push("El numero de telefono no es valido");
    regexContainSpaces.test(phoneNumber) &&
      phoneNumberError.push("El numero de telefono no debe contener espacios");
    regexContainSpecialCharacters.test(phoneNumber) &&
      phoneNumberError.push(
        "El numero de telefono no debe contener caracteres especiales"
      );
  }
};

const nameOrSurnameValidate = (name) => {
  const { minCantCharName, maxCantCharName, regexContainSpecialCharacters } =
    constsUserValidations;
  let nameError = "";
  if (!name) {
    nameError = "El nombre es requerido";
  } else if (name.length < minCantCharName) {
    nameError = `El nombre debe contener al menos ${minCantCharName} caracteres`;
  } else if (name.length > maxCantCharName) {
    nameError = `El nombre debe contener máximo ${maxCantCharName} caracteres`;
  } else if (regexContainSpecialCharacters.test(name)) {
    nameError = "El nombre no puede contener caracteres especiales";
  }
  return nameError;
};

const dniValidate = (dni) => {
  const { regexDni, regexContainSpecialCharacters, regexContainSpaces } =
    constsUserValidations;
  let dniError = [];
  if (!dni) {
    dniError = "El dni es requerido";
  } else {
    !regexDni.test(dni) && dniError.push("El dni no es valido");
    regexContainSpecialCharacters.test(dni) &&
      dniError.push("El dni no debe contener caracteres especiales");
    regexContainSpaces.test(dni) &&
      dniError.push("El dni no puede contener espacios");
  }
  return dniError;
};

// Validacion de información de usuario para inicio de sesion
export const userLoginValidate = (values, setErrors) => {
  const errors = {
    email: "",
    address: "",
  };

  errors.email = emailValidate(values.email);

  if (!values.address) {
    errors.address = "La contraseña es requerida";
  }

  setErrors(errors);
};

// Validación de información de usuario para registro
export const userRegisterValidate = (values, setErrors) => {
  const {
    email,
    address,
    confirmAddress,
    userName,
    phoneNumberAreaCode,
    phoneNumber,
    name,
    surname,
    dni,
  } = values;

  const errors = {
    email: "",
    address: [],
    confirmAddress: "",
    userName: "",
    phoneNumberAreaCode: [],
    phoneNumber: [],
    name: "",
    surname: "",
    dni: [],
  };

  email ? (errors.email = emailValidate(email)) : "";

  address ? (errors.address = addressValidate(address)) : "";

  confirmAddress
    ? (errors.confirmAddress = confirmAddressValidate(address, confirmAddress))
    : "";

  userName ? (errors.userName = usernameValidate(userName)) : "";

  phoneNumberAreaCode
    ? (errors.phoneNumberAreaCode =
        phoneNumberAreaCodeValidate(phoneNumberAreaCode))
    : "";

  phoneNumber ? (errors.phoneNumber = phoneNumberValidate(phoneNumber)) : "";

  name ? (errors.name = nameOrSurnameValidate(name)) : "";

  surname ? (errors.surname = nameOrSurnameValidate(surname)) : "";

  dni ? (errors.dni = dniValidate(dni)) : "";

  setErrors(errors);
};
