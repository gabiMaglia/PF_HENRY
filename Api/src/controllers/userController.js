const { User, UserRole, UserAddress, UserCredentials } = require("../db.js");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const user = await User.findAll();
  return user;
};
const getAllRoles = async () => {
  const roles = await UserRole.findAll();
  return roles;
};
const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [UserRole, UserAddress, UserCredentials],
  });
  return user;
};

const ceateRole = async (role_name) => {
  const role = await UserRole.findOrCreate({
    where: { role_name },
    defaults: { role_name },
  });
  return role[0];
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
  console.log(userCredentials);
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
  console.log(roles);
  const role_name = roles;
  const [userRole] = await UserRole.findOrCreate({
    where: { role_name },
    defaults: { role_name },
  });

  await newUser.setRole(userRole, { as: "role" });

  const completeUser = await User.findByPk(newUser.id, {
    include: [UserAddress, UserCredentials, { model: UserRole, as: "role" }],
  });

  return completeUser;
};

const editUserById = async (id, body) => {
  console.log("editUserbyId");
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
  getAllRoles,
  getUserById,
  editUserById,
  ceateRole,
  postUser,
  deleteUserById,
};
