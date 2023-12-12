const {
  ProductBrand,
  ProductCategory,
  ProductImage,
  ProductStock,
  Product,
} = require("../../db");

const filterProducts = async (categoryName, brandName) => {
  const filterConditions = {};

  if (categoryName) {
    filterConditions.category = categoryName;
    const category = await ProductCategory.findOne({
      where: { name: categoryName },
    });

    if (category) {
      const categoryWithProducts = await category.getProducts({
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductCategory, attributes: ["name"] },
          { model: ProductImage, attributes: ["address"] },
          { model: ProductStock, attributes: ["amount"] },
        ],
      });
      return categoryWithProducts;
    }
  }

  if (categoryName && brandName) {
    filterConditions.category = categoryName;
    filterConditions.brand = brandName;

    const category = await ProductCategory.findOne({
      where: { name: categoryName },
    });

    const brand = await ProductBrand.findOne({
      where: { name: brandName },
    });

    if (category && brand) {
      const categoryWithProducts = await category.getProducts({
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductCategory, attributes: ["name"] },
          { model: ProductImage, attributes: ["address"] },
          { model: ProductStock, attributes: ["amount"] },
        ],
      });
      const bothFilters = categoryWithProducts.filter(
        (product) => product.ProductBrands.name === brandName
      );

      return bothFilters;
    }
  }

  if (brandName) {
    filterConditions.brand = brandName;
    const brand = await ProductBrand.findOne({
      where: { name: brandName },
    });

    if (brand) {
      const brandWithProducts = await brand.getProducts({
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductCategory, attributes: ["name"] },
          { model: ProductImage, attributes: ["address"] },
          { model: ProductStock, attributes: ["amount"] },
        ],
      });
      return brandWithProducts;
    }
  }

  // Fetch products based on the filtering conditions
  const filteredProducts = await Product.findAll({
    where: filterConditions,
    include: [
      { model: ProductBrand, attributes: ["name"] },
      { model: ProductCategory, attributes: ["name"] },
      { model: ProductImage, attributes: ["address"] },
      { model: ProductStock, attributes: ["amount"] },
    ],
  });

  return filteredProducts;
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
