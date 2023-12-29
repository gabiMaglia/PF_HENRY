const {
  getAllBrands,
  getBrandById,
  deleteBrand,
  updateBrand,
  getBrandWithProducts,
} = require("../../controllers/productControllers/brandController");

const getAllBrandsHandler = async (req, res) => {
  try {
    const brands = await getAllBrands();

    if (brands === "No hay marcas disponibles") {
      return res.status(404).json({ error: brands });
    }

    res.status(200).json(brands);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBrandByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await getBrandById(id);
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(400).json({ error: `Marca con ID: ${id} no fue encontrada` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBrandHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedBrand = await updateBrand(id, updateData);
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBrandHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await deleteBrand(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//FILTRADO DE PRODUCTS POR BRAND NAME
const getBrandWithProductsHandler = async (req, res) => {
  const { name } = req.params;

  try {
    const brandProducts = await getBrandWithProducts(name);
    if (!brandProducts) {
      res
        .status(400)
        .json({ error: `Marca con nombre: ${name} no fue encontrada` });
    } else {
      res.status(200).json(brandProducts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBrandsHandler,
  getBrandByIdHandler,
  updateBrandHandler,
  deleteBrandHandler,
  getBrandWithProductsHandler,
};
