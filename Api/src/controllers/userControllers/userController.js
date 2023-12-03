const { User } = require("../db");

const getAllUsers = async () => {
  console.log("soyTodos");
};
const getUserById = async (id) => {
  console.log("soyUnUser");
};
const postUser = async (body) => {
  console.log("postUser");
};
const editUserById = async (id, body) => {
  console.log("editUserbyId");
};
const deleteUserById = async (id) => {
  console.log("deleteUserbyId");
};

module.exports = {
  getAllUsers,
  getUserById,
  editUserById,
  postUser,
  deleteUserById,
};
