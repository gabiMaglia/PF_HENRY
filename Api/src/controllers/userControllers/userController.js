const { User, UserRole, UserAddress, UserCredentials } = require("../../db.js");

const bcrypt = require("bcrypt");

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
const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: UserRole, as: "role" }, UserAddress],
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
  role
) => {
  const user = await User.findByPk(id);
  if (!user)
    return {
      error: true,
      response: `No se encontro el usuario requerido `,
    };
  await user.update({
    name: name || user.name,
    surname: surname || user.surname,
    birthdate: birthdate || user.birthdate,
    dni: dni || user.dni,
    email: email || user.email,
    telephone: telephone || user.telephone,
    image: image || user.image,
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

const deleteUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user?.name) {
    return {
      error: true,
      response: `No se encontro ningun usuario con ese id`,
    };
  } else {
    await await User.destroy({
      where: { id: id },
      force: true,
    });
    return { response: `Eliminaste correctamente al usuario ${user.name}` };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  editUserById,
  deleteUserById,
};