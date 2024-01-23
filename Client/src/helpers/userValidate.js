const constsUserValidations = {
  regexEmail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  minCantCharUsername: 3,
  maxCantCharUsername: 40,
  minCantCharAddress: 8,
  maxCantCharAddress: 20,
  regexContainNumber: /\d/,
  regexContainUpperCase: /[A-Z]/,
  regexContainLowerCase: /[a-z]/,
  regexContainSpaces: /\s/,
  regexContainSpecialCharacters: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  regexPhoneNumberAreaCode: /^\d{3,5}$/,
  regexPhoneNumber: /^\d{5,8}$/,
  minCantCharName: 3,
  maxCantCharName: 20,
  minCantCharLastName: 3,
  maxCantCharLastName: 20,
  regexDni: /^[1-9]\d{6,7}$/,
  minCantCharCountry: 3,
  regexZipCode: /^[A-Z]\d{4}$/i,
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
  const {
    regexContainSpaces,
    minCantCharUsername,
    maxCantCharUsername,
    // regexContainNumber, 
  } = constsUserValidations;
  let usernameError = "";

  if (!username) {
    usernameError = "El nombre de usuario es requerido";
  } else if (username.length < minCantCharUsername) {
    usernameError = `El nombre de usuario debe contener al menos ${minCantCharUsername} caracteres`;
  } else if (username.length > maxCantCharUsername) {
    usernameError = `El nombre de usuario debe contener máximo ${maxCantCharUsername} caracteres`;
  } else if (regexContainSpaces.test(username)) {
    usernameError = "El nombre de usuario no puede contener espacios";
   } 
  //  else if (regexContainNumber.test(username)) {
  //   usernameError = "El nombre de usuario no puede contener números";
  // }

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
  const { minCantCharName, maxCantCharName, regexContainSpecialCharacters, regexContainNumber,  } =
    constsUserValidations;
  let nameError = "";
  if (!name || name === "") {
    nameError = "El nombre es requerido";
  } else if (name.length < minCantCharName) {
    nameError = `El nombre debe contener al menos ${minCantCharName} caracteres`;
  } else if (name.length > maxCantCharName) {
    nameError = `El nombre debe contener máximo ${maxCantCharName} caracteres`;
  } else if (regexContainSpecialCharacters.test(name)) {
    nameError = "El nombre no puede contener caracteres especiales";
  }else if (regexContainNumber.test(name)) {
    nameError = "El nombre de usuario no puede contener números";
  }

  return nameError;
};

const surnameValidate = (surname) => {
  const { minCantCharName, maxCantCharName, regexContainSpecialCharacters, regexContainNumber } =
    constsUserValidations;
  let surnameError = "";
  if (!surname || surname === "") {
    surnameError = "El apellido es requerido";
  } else if (surname.length < minCantCharName) {
    surnameError = `El apellido debe contener al menos ${minCantCharName} caracteres`;
  } else if (surname.length > maxCantCharName) {
    surnameError = `El apellido debe contener máximo ${maxCantCharName} caracteres`;
  } else if (regexContainSpecialCharacters.test(surname)) {
    surnameError = "El apellido no puede contener caracteres especiales";
  }else if (regexContainNumber.test(surname)) {
    surnameError = "El nombre de usuario no puede contener números";
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

const countryValidate = (country) => {
  const { regexContainSpecialCharacters, minCantCharCountry } =
    constsUserValidations;
  let countryError = [];
  if (!country) {
    countryError.push("El pais es requerido");
  } else {
    country.length < minCantCharCountry &&
      countryError.push(
        `El pais debe contener al menos ${minCantCharCountry} caracteres`
      );
    regexContainSpecialCharacters.test(country) &&
      countryError.push("El pais no puede contener caracteres especiales");
  }
  return countryError;
};

const stateValidate = (state) => {
  const { regexContainSpecialCharacters, minCantCharCountry } =
    constsUserValidations;
  let stateError = [];
  if (!state) {
    stateError.push("El estado es requerido");
  } else {
    state.length < minCantCharCountry &&
      stateError.push(
        `El estado debe contener al menos ${minCantCharCountry} caracteres`
      );
    regexContainSpecialCharacters.test(state) &&
      stateError.push("El estado no puede contener caracteres especiales");
  }
  return stateError;
};

const cityValidate = (city) => {
  const { regexContainSpecialCharacters, minCantCharCountry } =
    constsUserValidations;
  let cityError = [];
  if (!city) {
    cityError.push("La ciudad es requerida");
  } else {
    city.length < minCantCharCountry &&
      cityError.push(
        `La ciudad debe contener al menos ${minCantCharCountry} caracteres`
      );
    regexContainSpecialCharacters.test(city) &&
      cityError.push("La ciudad no puede contener caracteres especiales");
  }
  return cityError;
};

const streetValidate = (street) => {
  const { regexContainSpecialCharacters, minCantCharCountry } =
    constsUserValidations;
  let streetError = [];
  if (!street) {
    streetError.push("La calle es requerida");
  } else {
    street.length < minCantCharCountry &&
      streetError.push(
        `La calle debe contener al menos ${minCantCharCountry} caracteres`
      );
    regexContainSpecialCharacters.test(street) &&
      streetError.push("La calle no puede contener caracteres especiales");
  }
  return streetError;
};

const numberValidate = (number) => {
  const { regexContainSpecialCharacters } = constsUserValidations;
  let numberError = [];
  if (!number) {
    numberError.push("El numero es requerido");
  } else {
    regexContainSpecialCharacters.test(number) &&
      numberError.push("El numero no puede contener caracteres especiales");
  }
  return numberError;
};

const zipCodeValidate = (zipCode) => {
  const { regexContainSpecialCharacters, regexZipCode } = constsUserValidations;
  let zipCodeError = [];
  if (!zipCode) {
    zipCodeError.push("El codigo postal es requerido");
  } else {
    !regexZipCode.test(zipCode) &&
      zipCodeError.push("El codigo postal no es valido");
    regexContainSpecialCharacters.test(zipCode) &&
      zipCodeError.push(
        "El codigo postal no puede contener caracteres especiales"
      );
  }
  return zipCodeError;
};

// Validacion de información de usuario para inicio de sesion
export const userLoginValidate = (values, setErrors, antErrors) => {
  const { username, address, email } = values;

  const errors = {
    ...antErrors,
  };

  username !== undefined ? (errors.username = usernameValidate(username)) : "";

  if (address !== undefined) {
    !address
      ? (errors.address = "La contraseña es requerida")
      : (errors.address = "");
  }

  email !== undefined ? (errors.email = emailValidate(email)) : "";

  setErrors(errors);
  return errors;
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

export const userEditValidate = (values, setErrors, antErrors) => {
  const {
    name,
    surname,
    email,
    phoneNumberAreaCode,
    phoneNumber,
    dni,
    country,
    state,
    city,
    street,
    number,
    zipCode,
  } = values;

  const errors = {
    ...antErrors,
  };

  email !== undefined ? (errors.email = emailValidate(email)) : "";

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

  country !== undefined ? (errors.country = countryValidate(country)) : "";
  state !== undefined ? (errors.state = stateValidate(state)) : "";
  city !== undefined ? (errors.city = cityValidate(city)) : "";
  street !== undefined ? (errors.street = streetValidate(street)) : "";
  number !== undefined ? (errors.number = numberValidate(number)) : "";
  zipCode !== undefined ? (errors.zipCode = zipCodeValidate(zipCode)) : "";

  setErrors(errors);
  return errors;
};

export const userChangePasswordValidate = (passwords, setErrors, antErrors) => {
  const errors = { ...antErrors };

  const { password, confirmPassword } = passwords;

  password !== undefined ? (errors.password = addressValidate(password)) : "";

  confirmPassword !== undefined
    ? (errors.confirmPassword = confirmAddressValidate(
        password,
        confirmPassword
      ))
    : "";

  setErrors(errors);
  return errors;
};
