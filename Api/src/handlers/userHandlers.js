const { User } = require("../db");
const { getUsers } = require("../controllers/userControllers");

const getUsersHandler = async (req, res) => {
try {
 

} catch (error) {
    return res.status(500).json(error.message);
}
};
const getUserByIdHandler = async (req, res) => {
try {
    
} catch (error) {
    return res.status(500).json(error.message);
}
};
const postUserHandler = async (req, res) => {
try {
    
} catch (error) {
    return res.status(500).json(error.message);
}
};
const editUserHandler =async  (req, res) => {
try {
    
} catch (error) {
    return res.status(500).json(error.message);
}
};
const deleteUserHandler =async  (req, res) => {
try {
    
} catch (error) {
    return res.status(500).json(error.message);
}
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  postUserHandler,
  editUserHandler,
  deleteUserHandler
};
