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
          { model: ProductImage, attributes: ["adress"] },
          { model: ProductStock, attributes: ["amount"] },
        ],
      });
      return categoryWithProducts;
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
          { model: ProductImage, attributes: ["adress"] },
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
      { model: ProductImage, attributes: ["adress"] },
      { model: ProductStock, attributes: ["amount"] },
    ],
  });

  return filteredProducts;
};

module.exports = { filterProducts };
