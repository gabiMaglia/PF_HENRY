const {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  getCategoriesWithProducts,
} = require("../../controllers/productControllers/categoryController");

const getAllCategoriesHandler = async (req, res) => {
  try {
    const allCategories = await getAllCategories();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//FILTRADO DE PRODUCTS POR NAME DE CATEGORY
const getCategoriesWithProductsHandler = async (req, res) => {
  const { name } = req.params;

  try {
    const categoryProducts = await getCategoriesWithProducts(name);
    if (categoryProducts) {
      res.status(200).json(categoryProducts);
    } else {
      res
        .status(400)
        .json({ error: `Category with Name: ${name} was not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(400).json({ error: `Category with ID:${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategoryHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedCategory = await updateCategory(id, updateData);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategoryHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await deleteCategory(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategoriesWithProductsHandler,
};
