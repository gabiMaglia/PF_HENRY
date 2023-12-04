const { Product } = require("../db");

//getProducts
const getAllProducts = async () => {
  console.log("traigo todos los produscts");
};

const postProduct = async ({
  name,
  description,
  price,
  warranty,
  is_deleted,
  stock,
  category,
  images,
  brand,
  soldCount,
}) => {
  const transaction = await conn.transaction();
  //transaction se convierte en un objeto que representa la transacción en curso.
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
    // { transaction } asegura que esta operación esté incluida en la transacción. Si algo sale
    //mal después de este punto, esta operación se revertirá durante el rollback de la transacción.
    if (category && images && brand && stock) {
      //Cuando estableces una relación de muchos a muchos entre dos modelos en Sequelize, se crea
      //automáticamente un método set seguido del nombre del modelo en plural para esa relación.
      await newProduct.setProductBrand(brand, { transaction });
      await newProduct.addProductCategories(category, { transaction });
      await newProduct.setProductStock(stock, { transaction });
      await newProduct.addProductImgs(images, { transaction });
    }
    //teams, { transaction } asegura que esta operación esté incluida en la transacción.

    //la transacción se confirma
    await transaction.commit();
    return newProduct;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateProduct = async () => {
  console.log("actualizo los products");
};

const deleteProduct = async (id) => {
  console.log(`borro el producto con id ${id}`);
};

const getProductById = async (id) => {
  console.log(`este es el producto ${id}`);
};

module.exports = {
  postProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
