const { postProduct } = require("../controllers/productController");

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

module.exports = {
  postProductHandler,
  getProductsHandler,
};
