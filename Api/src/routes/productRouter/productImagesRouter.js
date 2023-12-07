const { Router } = require("express");
const {
  getAllImagesHandler,
  getImageByIdHandler,
  deleteImageHandler,
  updateImageHandler,
} = require("../../handlers/imagesHandlers");

const imageRouter = Router();

imageRouter.get("/", getAllImagesHandler);
imageRouter.get("/:id", getImageByIdHandler);
imageRouter.delete("/:id", deleteImageHandler);
imageRouter.put("/:id", updateImageHandler);

module.exports = imageRouter;
