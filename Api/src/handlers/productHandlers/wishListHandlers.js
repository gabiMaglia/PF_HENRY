const {
  getWishListController,
} = require("../../controllers/productControllers/wishListController");

const getWishList = async (req, res) => {
  try {
    const list = getWishListController();
    if (list.error) {
      return res.status(404).json(list.response);
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports={
getWishList
}
