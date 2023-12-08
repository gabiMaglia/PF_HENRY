const { loginUser } = require("../controllers/authController");

const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const response = await loginUser(username, password);
    if (response.error) {
        return res.status(401).json(response.response) 
    }
    return res.status(200).json(response);
} catch (error) {
    return res.status(500).json(error.message);
}  
};
module.exports = {
  loginHandler,
};
