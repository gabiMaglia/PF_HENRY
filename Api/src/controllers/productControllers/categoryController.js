const {
  ProductBrand,
  ProductCategory,
  ProductImage,
  ProductStock,
} = require("../../db");
const getAllCategories = async () => {
  const allCategories = await ProductCategory.findAll();
  if (allCategories) {
    return allCategories;
  } else {
    return "No Categories Found";
  }
};

const getCategoriesWithProducts = async (categoryName) => {
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
};

const getCategoryById = async (id) => {
  const Category = await ProductCategory.findByPk(id);

  return Category;
};

const updateCategory = async (id, updateData) => {
  try {
    const CategoryToUpdate = await ProductCategory.findByPk(id);

    if (!CategoryToUpdate) {
      throw new Error(`Category with ID:${id} was not found`);
    }

    console.log("Current category:", CategoryToUpdate.toJSON());

    // Verificar si el nuevo nombre ya existe en la tabla para no repetir
    if (updateData.name) {
      const existingCategory = await ProductCategory.findOne({
        where: { name: updateData.name },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new Error(
          "There is already a category with that name. Please try a different one."
        );
      }
    }

    await CategoryToUpdate.update(updateData);

    const updatedCategory = await ProductCategory.findByPk(id);

    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  const Category = await getCategoryById(id);
  if (Category.name) {
    await Category.destroy();
    return {
      response: `${Category.name} deleted successfully`,
    };
  } else {
    return Category;
  }
};
const postCategory = async (name) => {
  try { 
    if (name === "") {
      return {
        error: true,
        response: "no se puede crear una categoria con valor vacio ",
      };
    }
    const lowerCaseName = name.toLowerCase();
    const [category] = await ProductCategory.findOrCreate({ where: { name: lowerCaseName } });
    await category.save();
    const categories = await ProductCategory.findAll();
    if (categories.length !== 0) {
      return  categories
    }else{
      return {
        error: true,
        response: `No se encontraron categorias`,
      };
    }
  } catch (error) {
    return {
      message: error.message,
    };
  }
};
module.exports = {
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  getCategoriesWithProducts,
  postCategory,
};
