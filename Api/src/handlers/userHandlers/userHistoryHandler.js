const {
  PostHistoryController,
} = require("../../controllers/userControllers/userHistoryController");

const PostHistory = async (req, res) => {
  const { UserId, value } = req.body;

  try {
    const response=await PostHistoryController(UserId,value)
    if(response.error){
        return res.status(404).json(response.response)
    }
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ error: error.message });
    
  }
};


module.exports={PostHistory}