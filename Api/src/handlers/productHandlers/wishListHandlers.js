const {
  getWishListController,
  postwishItemController,
} = require("../../controllers/productControllers/wishListController");

const getWishList = async (req, res) => {
  const {id}=req.params
  try {
    const list = await getWishListController(id);
    if (list.error) {
      return res.status(404).json(list.response);
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addWishItem = async (req, res) => {
  const { userID, productID } = req.body;
  try {
    const response = await postwishItemController(userID, productID);
    if (response.error) {
      return res.status(404).json(response.response);
    }
    res.status(200).json(response);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWishList,
  addWishItem
};
