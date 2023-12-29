const { Op } = require("sequelize");
const {
  Product,
  ProductBrand,
  ProductCategory,
  ProductImage,
  ProductStock,
} = require("../../db");
const cloudinary = require("../../config/cloudinaryConfig");

const { conn } = require("../../db");

//getProducts
const getAllProducts = async () => {
  try {
    const allProducts = Product.findAll({
      include: [
        { model: ProductBrand, attributes: ["name"] },
        { model: ProductCategory, attributes: ["name"] },
        { model: ProductImage, attributes: ["address"] },
        { model: ProductStock, attributes: ["amount"] },
      ],
    });
    return allProducts;
  } catch (error) {
    console.log(error.message);
  }
};

//POST PRODUCT
const postProduct = async ({
  name,
  description,
  price,
  warranty,
  is_deleted,
  stock,
  categoryName,
  images,
  brandName,
  soldCount,
}) => {
  const transaction = await conn.transaction();

  try {
    const newProduct = await Product.create(
      {
        name,
        description,
        price,
        warranty,
        soldCount,
        is_deleted,
      },
      { transaction }
    );

    if (categoryName && images && brandName && stock) {
      const [brand, createdBrand] = await ProductBrand.findOrCreate({
        where: { name: brandName },
        transaction,
      });

      await newProduct.addProductBrand(brand, {
        through: "ProductProductBrand",
        transaction,
      });

      const categoryPromises = categoryName.map(async (categoryName) => {
        const [category, createdCategory] = await ProductCategory.findOrCreate({
          where: { name: categoryName },
          transaction,
        });

        await newProduct.addProductCategory(category, { transaction });
      });

      await Promise.all(categoryPromises);

      const imagePromises = images.map(async (imageUrl) => {
        try {
          // Verificar si la imagen ya existe en Cloudinary
          const existingImage = await ProductImage.findOne({
            where: { address: imageUrl },
            transaction,
          });

          if (existingImage) {
            // Si la imagen ya existe, asocíala al producto y pasa a la siguiente iteración
            await newProduct.addProductImage(existingImage, { transaction });
            return;
          }
     
          const newImage = await ProductImage.create(
            { address: imageUrl },
            { transaction }
          );
          // Asocia la nueva imagen al producto
          await newProduct.addProductImage(newImage, { transaction });
        } catch (error) {
          console.error("Error al procesar la imagen:", error);
          throw error;
        }
      });

      // const imagePromises = images.map(async (imageUrl) => {
      //   // Busca la imagen existente
      //   const existingImage = await ProductImage.findOne({
      //     where: { address: imageUrl },
      //     transaction,
      //   });

      //   // Si existe, la asocia al producto; si no, crea una nueva instancia
      //   if (existingImage) {
      //     await newProduct.addProductImage(existingImage, { transaction });
      //   } else {
      //     const newImage = await ProductImage.create(
      //       { address: imageUrl },
      //       { transaction }
      //     );
      //     await newProduct.addProductImage(newImage, { transaction });
      //   }
      // });

      await Promise.all(imagePromises);

      const newStock = await ProductStock.create(
        { amount: stock },
        { transaction }
      );

      await newProduct.setProductStock(newStock, { transaction });
    }

    await transaction.commit();

    return newProduct;
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    throw error;
  }
};

// const updateProduct = async (id, updatedData) => {
//   try {
//     const productToUpdate = await Product.findByPk(id);

//     if (!productToUpdate) {
//       throw new Error("Producto no encontrado");
//     }

//     await productToUpdate.update(updatedData);

//     return productToUpdate;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

//UPDATE PRODUCT
const updateProduct = async (productId, updateData) => {
  try {
    const productToUpdate = await Product.findByPk(productId, {
      include: [ProductStock, ProductBrand, ProductImage, ProductCategory],
    });

    if (!productToUpdate) {
      throw new Error("Producto no encontrado");
    }

    if (updateData.ProductStock) {
      await productToUpdate.ProductStock.update(updateData.ProductStock);
    }

    if (updateData.ProductBrand) {
      await productToUpdate.ProductBrands[0].update(updateData.ProductBrand);
    }

    if (updateData.ProductImage) {
      await productToUpdate.ProductImage.update(updateData.ProductImage);
    }

    if (updateData.ProductCategory) {
      await productToUpdate.ProductCategory.update(updateData.ProductCategory);
    }

    await productToUpdate.update(updateData);

    return productToUpdate;
  } catch (error) {
    throw error;
  }
};

//DELETE PRODUCT
const deleteProduct = async (id) => {
  try {
    const productToDelete = await Product.findByPk(id);
    await productToDelete.destroy();
    return { productToDelete, deleted: true };
  } catch (error) {
    throw new Error(error);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: ProductBrand, attributes: ["name"] },
        { model: ProductCategory, attributes: ["name"] },
        { model: ProductImage, attributes: ["address"] },
        { model: ProductStock, attributes: ["amount"] },
      ],
    });
    return product;
  } catch (error) {
    console.error(error);
  }
};

//SEARCH BAR
const searchByName = async (name) => {
  try {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${name}%`,
            },
          },
        ],
      },
      include: [
        { model: ProductBrand, attributes: ["name"] },
        { model: ProductCategory, attributes: ["name"] },
        { model: ProductImage, attributes: ["address"] },
        { model: ProductStock, attributes: ["amount"] },
      ],
    });

    return products;
  } catch (error) {
    throw new Error(`Error en la búsqueda: ${error.message}`);
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  searchByName,
};
