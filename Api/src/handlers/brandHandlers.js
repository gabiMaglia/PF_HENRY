const {
  getAllBrands,
  getBrandById,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController");

const getAllBrandsHandler = async (req, res) => {
  try {
    const allBrands = await getAllBrands();
    res.status(200).json(allBrands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBrandByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await getBrandById(id);
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(400).json({ error: `Brand ${id} was not found` });
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

module.exports = {
  getAllBrandsHandler,
  getBrandByIdHandler,
  updateBrandHandler,
  deleteBrandHandler,
};
