const {
  getAllProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

//Post Product
const postProductHandler = async (req, res) => {
  const {
    name,
    description,
    price,
    warranty,
    stock,
    category,
    images,
    brand,
    soldCount,
  } = req.body;

  try {
    if (
      !name ||
      !description ||
      !price ||
      !warranty ||
      !stock ||
      !category ||
      !images ||
      !soldCount
    ) {
      return res.status(400).json({ error: "Missing required data..." });
    }
    const newProduct = await postProduct({
      name,
      description,
      price,
      warranty,
      stock,
      category,
      images,
      brand,
      soldCount,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", Product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductsHandler = async (req, res) => {
  try {
    const allProducts = getAllProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(`product ${id} updated`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id);
    res.status(200).json(`${deletedProduct.name} was deleted successfully`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const product = getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: `Product ${id} was not found.` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postProductHandler,
  getProductsHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
};
