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
const addressValidate = (address) => {
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
    addressErrors.push("La contraseña es requerida");
  } else {
    address.length < minCantCharAddress &&
      addressErrors.push(
        `La contraseña debe contener al menos ${minCantCharAddress} caracteres`
      );
    address.length > maxCantCharAddress &&
      addressErrors.push(
        `La contraseña debe contener máximo ${maxCantCharAddress} caracteres`
      );
    !regexContainNumber.test(address) &&
      addressErrors.push("La contaseña debe contener al menos un número");
  }
  !regexContainUpperCase.test(address) &&
    addressErrors.push(
      "La contraseña debe contener al menos una letra mayúscula"
    );
  !regexContainLowerCase.test(address) &&
    addressErrors.push(
      "La contraseña debe contener al menos una letra minúscula"
    );
  regexContainSpaces.test(address) &&
    addressErrors.push("La contraseña no debe contener espacios");
  return addressErrors;
};

// Validacion de confirmacion de contraseña
const confirmAddressValidate = (address, confirmAddress) => {
  let confirmAddressError = "";
  if (!confirmAddress) {
    confirmAddressError = "La confirmación de contraseña es requerida";
  } else if (confirmAddress !== address) {
    confirmAddressError = "Las contraseñas no coinciden";
  }
  return confirmAddressError;
};

// Validacion de nombre de usuario
const usernameValidate = (username) => {
  const { regexContainSpaces, minCantCharUsername, maxCantCharUsername } =
    constsUserValidations;
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
    !regexPhoneNumberAreaCode.test(phoneNumberAreaCode) &&
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
  const phoneNumberError = [];
  if (!phoneNumber) {
    phoneNumberError.push("El numero de telefono es requerido");
  } else {
    !regexPhoneNumber.test(phoneNumber) &&
      phoneNumberError.push("El numero de telefono no es valido");
    regexContainSpaces.test(phoneNumber) &&
      phoneNumberError.push("El numero de telefono no debe contener espacios");
    regexContainSpecialCharacters.test(phoneNumber) &&
      phoneNumberError.push(
        "El numero de telefono no debe contener caracteres especiales"
      );
  }

  return phoneNumberError;
};

const nameValidate = (name) => {
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

const surnameValidate = (surname) => {
  const { minCantCharName, maxCantCharName, regexContainSpecialCharacters } =
    constsUserValidations;
  let surnameError = "";
  if (!surname) {
    surnameError = "El apellido es requerido";
  } else if (surname.length < minCantCharName) {
    surnameError = `El apellido debe contener al menos ${minCantCharName} caracteres`;
  } else if (surname.length > maxCantCharName) {
    surnameError = `El apellido debe contener máximo ${maxCantCharName} caracteres`;
  } else if (regexContainSpecialCharacters.test(surname)) {
    surnameError = "El apellido no puede contener caracteres especiales";
  }
  return surnameError;
};

const dniValidate = (dni) => {
  const { regexDni, regexContainSpecialCharacters, regexContainSpaces } =
    constsUserValidations;
  let dniError = [];
  if (!dni) {
    dniError.push("El dni es requerido");
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
export const userLoginValidate = (values, setErrors, antErrors) => {
  const { username, address } = values;

  const errors = {
    ...antErrors,
  };

  username !== undefined ? (errors.username = usernameValidate(username)) : "";

  if (address !== undefined) {
    !address
      ? (errors.address = "La contraseña es requerida")
      : (errors.address = "");
  }

  setErrors(errors);
};

// Validación de información de usuario para registro
export const userRegisterValidate = (values, setErrors, antErrors) => {
  const {
    email,
    address,
    confirmAddress,
    username,
    phoneNumberAreaCode,
    phoneNumber,
    name,
    surname,
    dni,
  } = values;

  const errors = {
    ...antErrors,
  };

  email !== undefined ? (errors.email = emailValidate(email)) : "";

  address !== undefined ? (errors.address = addressValidate(address)) : "";

  confirmAddress !== undefined
    ? (errors.confirmAddress = confirmAddressValidate(address, confirmAddress))
    : "";

  username !== undefined ? (errors.username = usernameValidate(username)) : "";

  phoneNumberAreaCode !== undefined
    ? (errors.phoneNumberAreaCode =
        phoneNumberAreaCodeValidate(phoneNumberAreaCode))
    : "";

  phoneNumber !== undefined
    ? (errors.phoneNumber = phoneNumberValidate(phoneNumber))
    : "";

  name !== undefined ? (errors.name = nameValidate(name)) : "";

  surname !== undefined ? (errors.surname = surnameValidate(surname)) : "";

  dni !== undefined ? (errors.dni = dniValidate(dni)) : "";

  setErrors(errors);
};
