const { ProductImage } = require("../../db");

const getAllImages = async () => {
  const allImages = await ProductImage.findAll();
  if (allImages) {
    return allImages;
  } else {
    return "No Images Found";
  }
};

const getImageById = async (id) => {
  const image = await ProductImage.findByPk(id);
  if (!image) {
    throw new Error("Image not found");
  } else {
    return image;
  }
};

const updateImage = async (id, updateData) => {
  try {
    const imageToUpdate = await ProductImage.findByPk(id);

    if (!imageToUpdate) {
      throw new Error(`Image with ID:${id} was not found`);
    }

    console.log("Current Image:", imageToUpdate.toJSON());

    // Verificar si el nuevo nombre ya existe en la tabla para no repetir
    if (updateData.address) {
      const existingImage = await ProductImage.findOne({
        where: { address: updateData.address },
      });

      if (existingImage && existingImage.id !== id) {
        throw new Error(
          "There is already a Image with that address. Please try a different one."
        );
      }
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
      response: `${image.address} deleted successfully`,
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
