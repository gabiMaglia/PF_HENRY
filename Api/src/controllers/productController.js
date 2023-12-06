
// const { Product } = require("../db");

// getProducts
// const getAllProducts = async () => {
//   const products = Product.findAll();
//   return products;
// };

// const postProduct = async (
//   name,
//   description,
//   price,
//   warranty,
//   is_deleted,
//   stock,
//   categoryIds,
//   images,
//   brandIds,
//   soldCount,
// }) => {
//   const transaction = await conn.transaction();

//   try {
//     const newProduct = await Product.create(
//       {
//         name,
//         description,
//         price,
//         warranty,
//         soldCount,
//         is_deleted,
//       },
//       { transaction }
//     );


//     if (categoryIds && images && brandIds && stock) {
//       const productBrandPromises = brandIds.map((brandId) =>
//         newProduct.setProductBrand(brandId, { transaction })
//       );

//       const productCategoryPromises = categoryIds.map((categoryId) =>
//         newProduct.addProductCategories(categoryId, { transaction })
//       );

//       const productImgPromises = images.map((image) =>
//         newProduct.addProductImgs(image, { transaction })
//       );

//       await Promise.all([
//         ...productBrandPromises,
//         ...productCategoryPromises,
//         ...productImgPromises,
//         newProduct.setProductStock(stock, { transaction }),
//       ]);

//     // { transaction } asegura que esta operación esté incluida en la transacción. Si algo sale
//     // mal después de este punto, esta operación se revertirá durante el rollback de la transacción.
//     if (category && images && brand && stock) {
//       //Cuando estableces una relación de muchos a muchos entre dos modelos en Sequelize, se crea
//       //automáticamente un método set seguido del nombre del modelo en plural para esa relación.
//       await newProduct.setProductBrand(brand, { transaction });
//       await newProduct.addProductCategories(category, { transaction });
//       await newProduct.setProductStock(stock, { transaction });
//       await newProduct.addProductImgs(images, { transaction });

//     }

//     await transaction.commit();
//     return newProduct;

//   } catch (error) {
    
//     await transaction.rollback();
//     throw error;
//   }
// };

// const updateProduct = async (id) => {
//   try {
//     const updatedProduct = await Product.update({ id }, req.body, {
//       new: true,
//     });
//     res.json(updatedProduct);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const deleteProduct = async (id) => {
//   try {
//     const deletedProduct = await Product.delete({ id }, req.body, {
//       deleted: true,
//     });
//     return deletedProduct;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const getProductById = async (id) => {
//   try {
//     const product = await Product.findByPk(id, {
//       include: [
//         { model: ProductBrand, attributes: ["name"] },
//         { model: ProductCategory, attributes: ["name"] },
//         { model: ProductImage, attributes: ["adress"] },
//         { model: ProductStock, attributes: ["amount"] },
//       ],
//     });

//     if (!product) {
//       throw new Error("Product not found");
//     }
//     return product;
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = {
//   postProduct,
//   getAllProducts,
//   updateProduct,
//   deleteProduct,
//   getProductById,
// };

