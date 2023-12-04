const { User, UserRole, UserAddress, UserCredentials } = require("../db.js");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  const user = User.findAll();
  return user;
};
const getUserById = async (id) => {
  const user = User.findByPk(id, {
    include: [UserRole, UserAddress, UserCredentials],
  });
  return user;
};

const postUser = async (body) => {
  // UserOBJ
  const { name, surname, birthdate, dni, email, telephone, image = "" } = body;
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
  let { username, password} = body.userCredentials
  const newUserCredentials =  await newUser.createUserCredential({
    username,
    password : await bcrypt.hash(password, 8)
  }) 
  newUserCredentials.id = newUser.id
  await newUserCredentials.save()
  
  // UserAddress
  const { country, state, city, street, number, zipCode } = body.userAddress;
  const newUserAddress = await newUser.createUserAddress({
    country,
    state,
    city,
    street,
    number,
    zipCode,
  });
  newUserAddress.id = newUser.id
  await newUserAddress.save()
  
  // UserRoles
  const {role} = body
  


  const completeUser = User.findByPk(newUser.id, {
    include: [UserAddress, UserCredentials]
  })

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
    await User.destroy({
      where: { id: id },
      force: true,
    });
    return { response: `Eliminaste correctamente al usuario ${user.name}` };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  editUserById,
  postUser,
  deleteUserById,
};
