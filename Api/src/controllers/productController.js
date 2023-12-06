const {
  Product,
  ProductBrand,
  ProductCategory,
  ProductImage,
  ProductStock,
} = require("../db");

const { conn } = require("../db");

//getProducts
const getAllProducts = async () => {
  try {
    const allProducts = Product.findAll();
    return allProducts;
  } catch (error) {
    console.log(error.message);
  }
};

//postProducts
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
    // Crear el producto
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
      // Crear o encontrar la marca
      const [brand, createdBrand] = await ProductBrand.findOrCreate({
        where: { name: brandName },
        transaction,
      });

      // Asociar la marca al producto usando la tabla intermedia
      await newProduct.addProductBrand(brand, {
        through: "ProductProductBrand",
        transaction,
      });

      // Crear o encontrar las categorías
      const categoryPromises = categoryName.map(async (categoryName) => {
        const [category, createdCategory] = await ProductCategory.findOrCreate({
          where: { name: categoryName },
          transaction,
        });

        // Asociar la categoría al producto
        await newProduct.addProductCategory(category, { transaction });
      });

      // Esperar a que se resuelvan todas las promesas de categoría
      await Promise.all(categoryPromises);

      // Crear las imágenes asociadas al producto
      const imagePromises = images.map(async (imageUrl) => {
        const newImage = await ProductImage.create(
          { adress: imageUrl },
          { transaction }
        );
        // Asociar la imagen al producto
        await newProduct.addProductImage(newImage, { transaction });
      });

      // Esperar a que se resuelvan todas las promesas de imágenes
      await Promise.all(imagePromises);

      // Crear el stock asociado al producto
      const newStock = await ProductStock.create(
        { amount: stock }, // Utiliza "amount" en lugar de "quantity"
        { transaction }
      );

      // Asociar el stock al producto
      await newProduct.setProductStock(newStock, { transaction });
    }

    // Confirmar la transacción
    await transaction.commit();

    return newProduct;
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    throw error;
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    const productToUpdate = await Product.findByPk(id);

    if (!productToUpdate) {
      throw new Error("Producto no encontrado");
    }

    await productToUpdate.update(updatedData);

    return productToUpdate;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    // Consultar el producto antes de eliminarlo
    const productToDelete = await Product.findByPk(id);

    // Eliminar el producto
    const deletedProduct = await Product.destroy({
      where: {
        id: id,
      },
    });

    // Retornar el producto eliminado
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
        { model: ProductImage, attributes: ["adress"] },
        { model: ProductStock, attributes: ["amount"] },
      ],
    });

    if (!product) {
      throw new Error("Product not found");
    } else {
      return product;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
