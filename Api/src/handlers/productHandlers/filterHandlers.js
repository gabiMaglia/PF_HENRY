const {
  filterProducts,
} = require("../../controllers/prodcutControllers/filterController");

const filterProductsHandler = async (req, res) => {
  const { categoryName, brandName } = req.params;

  try {
    if (categoryName) {
      const filteredProducts = await filterProducts(categoryName);
      res.status(200).json(filteredProducts);
    } else if (categoryName && brandName) {
      const filteredProducts = await filterProducts(categoryName, brandName);
      res.status(200).json(filteredProducts);
    } else if (brandName) {
      const filteredProducts = await filterProducts(brandName);
      res.status(200).json(filteredProducts);
    } else {
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { filterProductsHandler };
