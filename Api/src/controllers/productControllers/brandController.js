const {
  Product,
  ProductBrand,
  ProductCategory,
  ProductImage,
  ProductStock,
} = require("../../db");

const getAllBrands = async () => {
  const allBrands = await ProductBrand.findAll();
  if (allBrands) {
    return allBrands;
  } else {
    return "No hay marcas disponibles";
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
      throw new Error(`Marca con ID:${id} no fue encontrada.`);
    }

    if (updateData.name) {
      const existingBrand = await ProductBrand.findOne({
        where: { name: updateData.name },
      });

      if (existingBrand && existingBrand.id !== id) {
        throw new Error(
          "Ya existe una marca con ese nombre. Intente uno nuevo."
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
      response: `${brand.name} ha sido eliminada.`,
    };
  }
};

//FILTRADO DE BRAND POR NAME
const getBrandWithProducts = async (brandName) => {
  try {
    const brand = await ProductBrand.findOne({
      where: { name: brandName },
    });

    if (!brand) {
      throw new Error(`No se encontró la marca con el nombre: ${brandName}`);
    }

    const brandWithProducts = await brand.getProducts({
      include: [
        { model: ProductBrand, attributes: ["name"] },
        { model: ProductCategory, attributes: ["name"] },
        { model: ProductImage, attributes: ["address"] },
        { model: ProductStock, attributes: ["amount"] },
      ],
    });

    return brandWithProducts;
  } catch (error) {
    console.error(`Error al obtener la marca con productos: ${error.message}`);
    return { error: error.message };
  }
};

module.exports = {
  deleteBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  getBrandWithProducts,
};
