const {
  ProductBrand,
  ProductCategory,
  ProductImage,
  ProductStock,
  Product,
} = require("../../db");

const filterProducts = async (categoryName, brandName) => {
  const filterConditions = {};

  if (brandName) {
    const brand = await ProductBrand.findOne({
      where: { name: brandName },
    });

    if (brand) {
      filterConditions.brandId = brand.id;
    }
  }

  if (categoryName) {
    const category = await ProductCategory.findOne({
      where: { name: categoryName },
    });

    if (category) {
      filterConditions.categoryId = category.id;
    }
  }

  try {
    const allProducts = await Product.findAll({
      include: [
        { model: ProductBrand, attributes: ["name"] },
        { model: ProductCategory, attributes: ["name"] },
        { model: ProductImage, attributes: ["address"] },
        { model: ProductStock, attributes: ["amount"] },
      ],
    });

    const filteredProducts = allProducts.filter((product) => {
      const hasCategory = product.ProductCategories.some(
        (category) => category.ProductCategoryId === filterConditions.categoryId
      );
      const hasBrand = product.ProductBrands.some(
        (brand) => brand.ProductBrandId === filterConditions.brandId
      );

      return hasCategory && hasBrand;
    });

    return filteredProducts;
  } catch (error) {
    console.error("Error al filtrar productos:", error);
    throw error;
  }
};

//ORDENAMIENTOS
const orderSoldCount = async () => {
  try {
    const productosDestacados = await Product.findAll({
      order: [["soldCount", "DESC"]],
    });

    return productosDestacados;
  } catch (error) {
    console.error("Error al obtener productos ordenados por soldCount:", error);
    throw error;
  }
};

const orderPrice = async (order) => {
  try {
    const mayusOrder = order.toUpperCase();
    const productsByPrice = await Product.findAll({
      order: [["price", `${mayusOrder}`]],
    });
    return productsByPrice;
  } catch (error) {
    console.error("Error al obtener productos ordenados por Price:", error);
    throw error;
  }
};

module.exports = { filterProducts, orderSoldCount, orderPrice };
