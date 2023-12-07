const { ProductBrand } = require("../db");

const getAllBrands = async () => {
  const allBrands = await ProductBrand.findAll();
  if (allBrands) {
    return allBrands;
  } else {
    return "No Brands Found";
  }
};

const getBrandById = async (id) => {
  const brand = await ProductBrand.findByPk(id);
  if (!brand) {
    throw new Error("Product not found");
  } else {
    return brand;
  }
};

const updateBrand = async (id, updateData) => {
  try {
    const BrandToUpdate = await ProductBrand.findByPk(id);

    if (!BrandToUpdate) {
      throw new Error("Producto no encontrado");
    } else {
      console.log("Brand before update:", BrandToUpdate.toJSON());
      await BrandToUpdate.update(updateData);
      console.log("Brand after update:", BrandToUpdate.toJSON());
      return BrandToUpdate;
    }
  } catch (error) {
    console.error("Error updating brand:", error);
    throw error;
  }
};

const deleteBrand = async (id) => {
  const brand = await getBrandById(id);
  if (brand.name) {
    await brand.destroy();
    return {
      response: `${brand.name} deleted successfully`,
    };
  } else {
    return brand;
  }
};

module.exports = {
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
};
