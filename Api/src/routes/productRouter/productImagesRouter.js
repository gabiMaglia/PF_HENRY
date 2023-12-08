const { Router } = require("express");
const {
  getAllImagesHandler,
  getImageByIdHandler,
  deleteImageHandler,
  updateImageHandler,
} = require("../../handlers/product/imagesHandlers");

const imageRouter = Router();

imageRouter.get("/", getAllImagesHandler);
imageRouter.get("/:id", getImageByIdHandler);
imageRouter.delete("/:id", deleteImageHandler);
imageRouter.put("/:id", updateImageHandler);

module.exports = imageRouter;
