const bcrypt = require("bcrypt");
const { User, UserRole, UserAddress } = require("../../db.js");
const {
  sendConfirmationEmail,
} = require("../../utils/emailTemplates.js");
const { tokenSign } = require("../../jwt/tokenGenerator.js");

const getAllUsers = async () => {
  const user = await User.findAll();
  if (user.length === 0) {
    return {
      error: true,
      response: `Users not found`,
    };
  }
  return user;
};

const getUserByDni = async (dni) => {
  const user = await User.findOne({
    where: { dni: dni },
    include: [{ model: UserRole, as: "role" }, UserAddress],
  });

  if (!user) {
    return {
      error: true,
      response: `Users not found`,
    };
  }
  return user;
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email: email },
    include: [{ model: UserRole, as: "role" }, UserAddress],
  });

  if (!user) {
    return {
      error: true,
      response: `Users not found`,
    };
  }
  return user;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [UserAddress],
  });
  if (!user) {
    return {
      error: true,
      response: `User not found`,
    };
  }
  return user;
};
const postUser = async (
  name,
  surname,
  birthdate,
  dni,
  email,
  telephone,
  image,
  userCredentials,
  userAddress,
  roles
) => {
  // UserOBJ
  const newUser = await User.create({
    name,
    surname,
    birthdate,
    dni,
    email,
    telephone,
    image,
    isActive: true,
  });
  // UserCredentials
  let { username, password } = userCredentials;
  const newUserCredentials = await newUser.createUserCredential({
    username,
    password: await bcrypt.hash(password, 8),
  });
  newUserCredentials.id = newUser.id;
  await newUserCredentials.save();
  // UserAddress
  const {
    country = "",
    state = "",
    city = "",
    street = "",
    number = "",
    zipCode = "",
  } = userAddress;

  const newUserAddress = await newUser.createUserAddress({
    country,
    state,
    city,
    street,
    number,
    zipCode,
  });
  newUserAddress.id = newUser.id;
  await newUserAddress.save();

  // UserRoles
  const role_name = roles;
  const [userRole] = await UserRole.findOrCreate({
    where: { role_name },
    defaults: { role_name },
  });

  await newUser.setRole(userRole, { as: "role" });

  const completeUser = await User.findByPk(newUser.id, {
    include: [UserAddress, { model: UserRole, as: "role" }],
  });

  return completeUser;
};
const editUserById = async (
  id,
  name,
  surname,
  birthdate,
  dni,
  email,
  telephone,
  image,
  userAddress,
  role,
  communication_preference
) => {
  const user = await User.findByPk(id);
  if (!user)
    return {
      error: true,
      response: `No se encontro el usuario requerido `,
    };
  const isEmailDifferent = email !== user.email;

  if (email !== "" && isEmailDifferent) {
    const confirmationEmailToken = tokenSign({userID : user.id}, '2d')
    await sendConfirmationEmail(
      process.env.EMAIL_MAILER,
      email,
      confirmationEmailToken,
      process.env.API_URL
    );
    await user.update({ isVerified: false });
  }
  await user.update({
    name: name || user.name,
    surname: surname || user.surname,
    birthdate: birthdate || user.birthdate,
    dni: dni || user.dni,
    email: email || user.email,
    telephone: telephone || user.telephone,
    image: image || user.image,
    communication_preference:
      communication_preference || user.communication_preference,
  });

  // ADDRESS UPDATE
  const { country, state, city, street, number, zipCode } = userAddress;

  const _userAddress = await UserAddress.findOne({
    where: { UserId: user.id },
  });
  await _userAddress.update({
    country: country || _userAddress.country,
    state: state || _userAddress.state,
    city: city || _userAddress.city,
    street: street || _userAddress.street,
    number: number || _userAddress.number,
    zipCode: zipCode || _userAddress.zipCode,
  });

  // ROL Update
  const role_name = role;

  const [userRole] = await UserRole.findOrCreate({
    where: { role_name },
    defaults: { role_name },
  });
  await user.setRole(userRole, { as: "role" });

  const updatedUser = await User.findByPk(id, {
    include: [UserAddress, { model: UserRole, as: "role" }],
  });

  return updatedUser;
};

//LOGICAL DELETE
const logicalDelete = async (id) => {
  if (!id) {
    return { error: true, response: "El id es requerido" };
  }
  const user = await User.findByPk(id);
  if (!user) {
    return { error: true, response: "Usuario no encontrado" };
  }
  await user.update({ isDeleted: !user.isDeleted });
  return `Usuario ${user.name} ${user.surname} ${
    user.isDeleted ? "Desactivado" : "Activado"
  } `;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByDni,
  getUserByEmail,
  postUser,
  editUserById,
  logicalDelete
};
