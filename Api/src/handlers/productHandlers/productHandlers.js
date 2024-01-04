const {
  getAllProducts,
  postProduct,
  postProductSeveral,
  updateProduct,
  deleteProduct,
  getProductById,
  searchByName,
  logicalDelete,
} = require("../../controllers/productControllers/productController");

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
      !stock ||
      !categoryName ||
      !brandName ||
      !images ||
      !soldCount
    ) {
      return res.status(400).json({ error: "Faltan datos requeridos..." });
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
      .json({ message: "Producto creado correctamente!", Product: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//POST PRODUCT SEVERAL
const postProductSeveralHandler = async (req, res) => {
  const products = req.body;
  try {
    const newProducts = await postProductSeveral(products);
    if (newProducts.error) {
      res.status(400).json({ error: newProducts.response });
    }
    res.status(201).json({
      message: "Productos creados correctamente!",
      Products: newProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProduct = await updateProduct(id, updatedData);
    res.status(200).json(updatedProduct);
    if (updatedProduct.error) {
      res.status(400).json({ error: error.response });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE
const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id);
    res.status(200).json(`El producto con ID: ${id} fue eliminado`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//LOGICAL DELETE
const logicalDeleteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await logicalDelete(id);
    if (result.error) {
      res.status(400).json({ error: result.response });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      res
        .status(404)
        .json({ error: `Producto con ID: ${id} no fue encontrado.` });
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
      res
        .status(404)
        .json({ error: `No se encontraron resultados para ${name}` });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postProductHandler,
  getProductsHandler,
  updateProductHandler,
  logicalDeleteHandler,
  deleteProductHandler,
  getProductByIdHandler,
  searchByNameHandler,
  postProductSeveralHandler,
};
