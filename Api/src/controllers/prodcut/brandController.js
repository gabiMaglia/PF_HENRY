const { ProductBrand } = require("../../db");

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
  return brand;
};

const updateBrand = async (id, updateData) => {
  try {
    const BrandToUpdate = await ProductBrand.findByPk(id);

    if (!BrandToUpdate) {
      throw new Error(`Brand with ID:${id} was not found`);
    }

    if (updateData.name) {
      const existingBrand = await ProductBrand.findOne({
        where: { name: updateData.name },
      });

      if (existingBrand && existingBrand.id !== id) {
        throw new Error(
          "There is already a brand with that name. Please try a different one."
        );
      }
    }

    await BrandToUpdate.update(updateData);

    const updatedBrand = await ProductBrand.findByPk(id);

    return updatedBrand;
  } catch (error) {
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

//FILTRADO DE BRAND POR NAME
const getBrandWithProducts = async (brandName) => {
  const brand = await ProductBrand.findOne({
    where: { name: brandName },
  });
  if (brand) {
    const brandWithProducts = await brand.getProducts();
    return brandWithProducts;
  }
};

module.exports = {
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  getBrandWithProducts,
};
