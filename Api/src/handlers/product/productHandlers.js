const { Product } = require("../../db");

const {
  getAllProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  searchByName,
} = require("../../controllers/prodcut/productController");

//Post Product
const postProductHandler = async (req, res) => {
  const {
    name,
    description,
    price,
    warranty,
    is_deleted,
    stock,
    categoryName,
    images,
    brandName,
    soldCount,
  } = req.body;

  try {
    if (
      !name ||
      !description ||
      !price ||
      !is_deleted ||
      !stock ||
      !categoryName ||
      !brandName ||
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
      is_deleted,
      stock,
      categoryName,
      images,
      brandName,
      soldCount,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", Product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET ALL PRODUCTS
const getProductsHandler = async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//UPDATE PRODUCTS
const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedProduct = await updateProduct(id, updatedData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE
const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id);
    res.status(200).json(`Product deleted successfully`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//GET BY ID
const getProductByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: `Product ${id} was not found.` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//SEARCH BAR
const searchByNameHandler = async (req, res) => {
  const name = req.query.name;
  try {
    const results = await searchByName(name);
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ error: `No products found` });
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
  searchByNameHandler,
};
