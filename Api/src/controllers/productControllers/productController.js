const { Op, INTEGER } = require("sequelize");
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

// POST SEVERAL PRODUCTS
const postProductSeveral = async (products) => {
  if (!products || products.length === 0) {
    return { error: true, response: "No hay productos para agregar" };
  }

  const newProducts = await Promise.all(
    products.map(async (product) => {
      let newImages = await Promise.all(
        product.images.map((imageURL) => {
          const cloudinaryResponse = cloudinary.uploader.upload(imageURL, {
            folder: "products",
            width: 300,
            format: "png",
          });

          return cloudinaryResponse;
        })
      );
      if (!newImages) {
        return {
          error: true,
          response: "No se pudo cargar la imagen en cloudinary",
        };
      }
      newImages = newImages.map((image) => image.secure_url);
      const newProduct = postProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        warranty: product.warranty,
        is_deleted: product.is_deleted,
        stock: product.stock,
        categoryName: product.categoryName,
        images: newImages,
        brandName: product.brandName,
        soldCount: product.soldCount,
      });
      if (!newProduct) {
        return {
          error: true,
          response: `No se pudo crear el producto: ${product.name}`,
        };
      }

      return newProduct;
    })
  );
  if (!newProducts) {
    return {
      error: true,
      response: `No se pudo crear los productos`,
    };
  }
  return newProducts;
};

//UPDATE PRODUCT
const updateProduct = async (productId, updateData) => {
  const productToUpdate = await Product.findByPk(productId, {
    include: [ProductStock, ProductBrand, ProductImage, ProductCategory],
  });

  if (!productToUpdate) {
    return { error: true, response: "Producto no encontrado" };
  }

  if (updateData.ProductStock) {
    await productToUpdate.ProductStock.update({
      amount: updateData.ProductStock,
    });
  }

  //Update brand
  if (updateData.ProductBrand) {
    await Promise.all(
      productToUpdate.ProductBrands.map(async (brand) => {
        return productToUpdate.removeProductBrand(brand);
      })
    );

    const [brand, createdBrand] = await ProductBrand.findOrCreate({
      where: { name: updateData.ProductBrand },
    });

    if (brand) {
      await productToUpdate.addProductBrand(brand, {
        through: "ProductProductBrand",
      });
    } else {
      await productToUpdate.addProductBrand(createdBrand, {
        through: "ProductProductBrand",
      });
    }
  }

  // Update Image
  if (updateData.ProductImage) {
    productToUpdate.ProductImages.map(async (image) => {
      await productToUpdate.removeProductImage(image);
      await image.destroy();
    });

    updateData.ProductImage.map(async (imageUrl) => {
      const existingImage = await ProductImage.findOne({
        where: { address: imageUrl },
      });

      if (existingImage) {
        await productToUpdate.addProductImage(existingImage);
      } else {
        const newImage = await ProductImage.create({ address: imageUrl });
        await productToUpdate.addProductImage(newImage);
      }
    });
  }

  if (updateData.ProductCategory) {
    await Promise.all(
      productToUpdate.ProductCategories.map(async (category) => {
        return productToUpdate.removeProductCategory(category);
      })
    );
    await Promise.all(
      updateData.ProductCategory.map(async (category) => {
        const [existingCategory, createdCategory] =
          await ProductCategory.findOrCreate({
            where: { name: category },
          });

        if (existingCategory) {
          return productToUpdate.addProductCategory(existingCategory);
        } else {
          return productToUpdate.addProductCategory(createdCategory);
        }
      })
    );
  }
  if (typeof updateData?.price !== "number") {
    updateData.price = Number(updateData.price);
  }

  await productToUpdate.update(updateData);

  const updatedProduct = await Product.findByPk(productId, {
    include: [
      { model: ProductImage, attributes: ["address"] },
      { model: ProductBrand, attributes: ["name"] },
      { model: ProductCategory, attributes: ["name"] },
      { model: ProductStock, attributes: ["amount"] },
    ],
  });
  return updatedProduct;
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

//LOGICAL DELETE
const logicalDelete = async (id) => {
  if (!id) {
    return { error: true, response: "El id es requerido" };
  }
  const product = await Product.findByPk(id);
  if (!product) {
    return { error: true, response: "Producto no encontrado" };
  }
  await product.update({ is_deleted: !product.is_deleted });

  return `${product.name} ${
    product.is_deleted ? " activado" : " desactivado"
  } `;
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

const productCarousel = async () => {
  try {
    const allProducts = await Product.findAll({
      where: { carousel: true },
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
module.exports = {
  logicalDelete,
  postProduct,
  postProductSeveral,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  searchByName,
  productCarousel,
};
