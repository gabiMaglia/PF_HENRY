const {
  getAllImages,
  getImageById,
  deleteImage,
  updateImage,
} = require("../../controllers/prodcut/imageController");

const getAllImagesHandler = async (req, res) => {
  try {
    const allImages = await getAllImages();
    res.status(200).json(allImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getImageByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await getImageById(id);
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(400).json({ error: `Image with ID:${id} was not found` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateImageHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedImage = await updateImage(id, updateData);
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteImageHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await deleteImage(id);
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllImagesHandler,
  getImageByIdHandler,
  updateImageHandler,
  deleteImageHandler,
};
