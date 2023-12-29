const { ProductImage } = require("../../db");

const getAllImages = async () => {
  const allImages = await ProductImage.findAll();
  if (allImages) {
    return allImages;
  } else {
    return "No se encontraron imagenes";
  }
};

const getImageById = async (id) => {
  const image = await ProductImage.findByPk(id);
  return image;
};

const updateImage = async (id, updateData) => {
  try {
    const imageToUpdate = await ProductImage.findByPk(id);
    if (!imageToUpdate) {
      throw new Error(`Imagen con ID:${id} no fue encontrada.`);
    }
    if (updateData.address) {
      const existingImage = await ProductImage.findOne({
        where: { address: updateData.address },
      });
    }
    await imageToUpdate.update(updateData);
    const updatedImage = await ProductImage.findByPk(id);
    return updatedImage;
  } catch (error) {
    throw error;
  }
};

const deleteImage = async (id) => {
  const image = await getImageById(id);
  if (image.address) {
    await image.destroy();
    return {
      response: `${id} ha sido eliminado`,
    };
  } else {
    return image;
  }
};

module.exports = {
  deleteImage,
  getAllImages,
  getImageById,
  updateImage,
};
